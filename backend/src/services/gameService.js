import mongoose from "mongoose";

import Game from "../models/game.js";
import Bet from "../models/bet.js";
import User from "../models/user.js";

import { winnerMessage, lossMessage } from "../utils/bet-messages.js";
import { sendMsgToUser } from "../websockets/websocket-server.js";

const bettingEndLimit = 10000; // Give users 10 seconds to bet
const gameEndLimit = 15000; // The Game last 15 seconds

const createGame = async () => {
  // Generate a Game ID
  const gameId = new mongoose.Types.ObjectId();
  const now = new Date();

  // Betting ends after 10 seconds
  const bettingEndsAt = new Date(now.getTime() + bettingEndLimit);

  // Game ends after 15 seconds
  const gameEndsAt = new Date(now.getTime() + gameEndLimit);

  const newGame = new Game({
    _id: gameId,
    bettingEndsAt,
    gameEndsAt,
  });

  await newGame.save();

  console.log(`\nNew Game Created: ID ${gameId}`);

  return gameId;
};

const generateLuckySeven = async (gameId) => {
  // Roll a dice (1-6)
  const diceOne = Math.ceil(Math.random() * 6);
  const diceTwo = Math.ceil(Math.random() * 6);

  const rollResult = diceOne + diceTwo;
  const isLucky = rollResult === 7;

  // Update the game with the roll result and outcome
  await Game.findByIdAndUpdate(gameId, {
    rollValues: [diceOne, diceTwo],
    isLucky,
  });

  console.log(
    `Game ${gameId} completed: Roll [${diceOne}, ${diceTwo}], (Lucky 7 -> ${isLucky})`
  );
};

const determineWinners = async (gameId) => {
  try {
    const game = await Game.findById(gameId);

    if (!game) {
      console.error(`Game ${gameId} not found.`);
      return;
    }

    if (game.rollValues === null || game.isLucky === null) {
      console.error(`Game ${gameId} does not have a result yet.`);
      return;
    }

    const isLucky = game.isLucky;

    // Update bets
    const bets = await Bet.find({ gameId });
    for (const bet of bets) {
      const isWinner = bet.guess == isLucky;

      await Bet.findByIdAndUpdate(bet._id, { isWinner });

      // Broadcast to users who won/loss (if still connected)
      if (isWinner) {
        sendMsgToUser(bet.userId, winnerMessage);
      } else {
        sendMsgToUser(bet.userId, lossMessage);
      }
    }

    console.log(`Winners for Game ${gameId} have been determined.`);
  } catch (error) {
    console.error("Error determining winners:", error);
    throw new Error(error.message || "Internal server error.");
  }
};

const updateWinningStreaks = async (gameId) => {
  try {
    const bets = await Bet.find({ gameId }).populate("userId");

    for (const bet of bets) {
      const user = bet.userId;

      // Skip if the user is not found
      if (!user) continue;

      if (bet.isWinner) {
        user.currentWinningStreak += 1;

        // Update highest streak if the current streak exceeds it
        if (user.currentWinningStreak > user.highestStreak) {
          user.highestStreak = user.currentWinningStreak;
        }
      } else {
        // Reset
        user.currentWinningStreak = 0;
      }

      await user.save();
    }

    console.log(`Winning streaks updated for Game ${gameId}.`);
  } catch (error) {
    console.error("Error updating winning streaks:", error);
    throw new Error(error.message || "Internal server error.");
  }
};

const getTopWinningStreaks = async (limit) => {
  try {
    // Get the top k highest streaks, sort in desc order
    const topKUsers = await User.find({})
      .select("name highestStreak")
      .sort({ highestStreak: -1 })
      .limit(limit); // Limit to k but defaults to 10

    // If no streaks calculated yet
    if (topKUsers.length === 0) {
      return [];
    }

    // Find minimum streak of the top k
    const minStreak = topKUsers[topKUsers.length - 1].highestStreak;

    // Fetch all users with streaks >= minStreak
    // This take account for ties,
    // if user has highest streak >= the min streak, include the user
    const topStreaks = await User.find({ highestStreak: { $gte: minStreak } })
      .select("name highestStreak")
      .sort({ highestStreak: -1 });

    return topStreaks;
  } catch (error) {
    console.error("Error retrieving top winning streaks:", error);
    throw new Error(error.message || "Internal server error.");
  }
};

export {
  createGame,
  generateLuckySeven,
  determineWinners,
  updateWinningStreaks,
  getTopWinningStreaks,
};
