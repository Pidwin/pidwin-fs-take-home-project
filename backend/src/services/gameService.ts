import mongoose, { ObjectId } from "mongoose";
import Game from "../models/game";
import Bet from "../models/bet";
import User from "../models/user";
import { winnerMessage, lossMessage } from "../utils/bet-messages";
import {
  broadcastMessage,
  sendMsgToUser,
} from "../websockets/websocket-server";
import { IUser } from "../types/user.interface";
import { IBet } from "../types/bet.interace";
import { IGame } from "../types/game.interface";

// Maintain Scheduling
let gameIntervalId: NodeJS.Timeout | null = null;
let timeoutIds: NodeJS.Timeout[] = [];

// Constants
const bettingEndLimit = 10000; // 10 seconds to bet
const gameEndLimit = 15000; // Game lasts 15 seconds

const createGame = async (): Promise<mongoose.Types.ObjectId> => {
  const gameId = new mongoose.Types.ObjectId();
  const now = new Date();

  const newGame = new Game({
    _id: gameId,
    bettingEndsAt: new Date(now.getTime() + bettingEndLimit),
    gameEndsAt: new Date(now.getTime() + gameEndLimit),
  });

  await newGame.save();
  console.log(`\nNew Game Created: ID ${gameId}`);

  return gameId;
};

const generateLuckySeven = async (
  gameId: mongoose.Types.ObjectId
): Promise<void> => {
  const diceOne = Math.ceil(Math.random() * 6);
  const diceTwo = Math.ceil(Math.random() * 6);

  const rollResult = diceOne + diceTwo;
  const isLucky = rollResult === 7;

  await Game.findByIdAndUpdate(gameId, {
    rollValues: [diceOne, diceTwo],
    isLucky,
  });

  console.log(
    `Game ${gameId} completed: Roll [${diceOne}, ${diceTwo}], (Lucky 7 -> ${isLucky})`
  );
};

const determineWinners = async (
  gameId: mongoose.Types.ObjectId
): Promise<void> => {
  try {
    const game: IGame | null = await Game.findById(gameId);

    if (!game) {
      console.error(`Game ${gameId} not found.`);
      return;
    }

    if (!game.rollValues || game.isLucky === undefined) {
      console.error(`Game ${gameId} does not have a result yet.`);
      return;
    }

    const isLucky = game.isLucky;
    const bets: IBet[] = await Bet.find({ gameId });

    for (const bet of bets) {
      const isWinner = bet.guess === isLucky;
      await Bet.findByIdAndUpdate(bet._id, { isWinner });

      // Notify specific user about their result
      sendMsgToUser(
        bet.userId.toString(),
        isWinner ? winnerMessage : lossMessage
      );
    }

    console.log(`Winners for Game ${gameId} have been determined.`);
  } catch (error) {
    console.error("Error determining winners:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error."
    );
  }
};

const updateWinningStreaks = async (
  gameId: mongoose.Types.ObjectId
): Promise<void> => {
  try {
    const bets: any = await Bet.find({
      gameId,
    }).populate<{ userId: IUser }>("userId");

    for (const bet of bets) {
      const userDB: IUser = bet.userId;

      if (!userDB) continue;

      if (bet.isWinner) {
        userDB.currentWinningStreak += 1;
        if (userDB.currentWinningStreak > userDB.highestStreak) {
          userDB.highestStreak = userDB.currentWinningStreak;
        }
      } else {
        userDB.currentWinningStreak = 0;
      }

      await userDB.save();
    }

    console.log(`Winning streaks updated for Game ${gameId}.`);
  } catch (error) {
    console.error("Error updating winning streaks:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error."
    );
  }
};

const getTopWinningStreaks = async (limit: number = 10): Promise<IUser[]> => {
  try {
    const topKUsers: IUser[] = await User.find({})
      .select("name highestStreak")
      .sort({ highestStreak: -1 })
      .limit(limit);

    if (topKUsers.length === 0) return [];

    const minStreak = topKUsers[topKUsers.length - 1].highestStreak;

    const topStreaks: IUser[] = await User.find({
      highestStreak: { $gte: minStreak },
    })
      .select("name highestStreak")
      .sort({ highestStreak: -1 });

    return topStreaks;
  } catch (error) {
    console.error("Error retrieving top winning streaks:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error."
    );
  }
};

const scheduleGames = () => {
  // Do not start a new interval if one is already active
  if (gameIntervalId) {
    console.log("Game scheduling is already running.");
    return;
  }

  // Start scheduling games every 15 seconds
  gameIntervalId = setInterval(async () => {
    try {
      const gameId = await createGame();

      // Broadcast New Game Information to Frontend
      broadcastMessage({
        type: "NEW_GAME",
        id: gameId,
      });

      // Roll dice and update result after 15 seconds
      const timeoutId = setTimeout(async () => {
        try {
          // Does the roll
          await generateLuckySeven(gameId);

          // Determine winners and update bets
          await determineWinners(gameId);

          // Update winning streaks of users that won
          // or reset for losses that occurred
          await updateWinningStreaks(gameId);
        } catch (error) {
          console.error("Error in game logic:", error);
        }
      }, 15000);

      // Store timeoutId for potential later cancellation
      timeoutIds.push(timeoutId);
    } catch (error) {
      console.error("Error scheduling game:", error);
    }
  }, 15000);

  console.log("Game scheduling started immediately.");
  return;
};

const stopActiveGames = () => {
  if (gameIntervalId) {
    clearInterval(gameIntervalId);

    // Reset the interval ID to allow restarting
    gameIntervalId = null;
    console.log("Game scheduling stopped.");
  }

  // Clear all timeouts
  timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  timeoutIds = [];
  console.log("Game creation timeout cleared.");
};

export const getActiveTimeoutId = () => gameIntervalId;

export {
  createGame,
  generateLuckySeven,
  determineWinners,
  updateWinningStreaks,
  getTopWinningStreaks,
  scheduleGames,
  stopActiveGames,
};
