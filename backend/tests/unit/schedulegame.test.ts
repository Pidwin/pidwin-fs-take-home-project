import bcrypt from "bcryptjs";
import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
dotenv.config();

import {
  createGame,
  determineWinners,
  generateLuckySeven,
  getActiveTimeoutId,
  getTopWinningStreaks,
  stopActiveGames,
  updateWinningStreaks,
} from "../../src/services/gameService";
import Game from "../../src/models/game";
import Bet from "../../src/models/bet";
import User from "../../src/models/user";

const createTestUser = async (
  email: string,
  password: string,
  name: string = "Test User",
  highestStreak: number = 0,
  currentWinningStreak: number = 0
) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    email,
    password: hashedPassword,
    name: name,
    currentWinningStreak: currentWinningStreak,
    highestStreak: highestStreak,
  });
};
describe("Game Scheduler Tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    } as ConnectOptions);
  });

  afterEach(async () => {
    jest.useRealTimers();
    stopActiveGames();
    await Game.deleteMany({});
    await Bet.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    // stopActiveGames();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  test("should create a new game", async () => {
    const gameId = await createGame();
    const game = await Game.findById(gameId);

    expect(game).not.toBeNull();
    expect(gameId).not.toBeNull();
    expect(game?.bettingEndsAt).toBeDefined();
    expect(game?.gameEndsAt).toBeDefined();
  });

  test("should roll dice and update game result", async () => {
    const gameId = await createGame();
    await generateLuckySeven(gameId);

    const updatedGame = await Game.findById(gameId);

    expect(updatedGame).not.toBeNull();
    expect(updatedGame?.rollValues).toHaveLength(2);
    expect(typeof updatedGame?.isLucky).toBe("boolean");
  });

  test("should determine winners correctly", async () => {
    const gameId = await createGame();
    await generateLuckySeven(gameId);

    await Bet.create([
      { userId: new mongoose.Types.ObjectId(), gameId, guess: true },
      { userId: new mongoose.Types.ObjectId(), gameId, guess: false },
    ]);

    await determineWinners(gameId);
    const updatedBets = await Bet.find({ gameId });

    expect(updatedBets).not.toBeNull();
    expect(updatedBets.length).toBe(2);
    expect(updatedBets.some((bet) => bet.isWinner !== undefined)).toBeTruthy();
  });
  test("should update user winning streaks", async () => {
    const gameId = await createGame();
    const email = "t@example.com";
    const password = "isRightPassword";
    const name = "T User";
    let currentWinningStreak = 2;
    let highestStreak = 2;
    const user = await createTestUser(
      email,
      password,
      name,
      currentWinningStreak,
      highestStreak
    );

    await Bet.create({ userId: user._id, gameId, guess: true, isWinner: true });

    await updateWinningStreaks(gameId);

    const userDB = await User.findById(user._id);
    expect(userDB?.currentWinningStreak).toBe(3);
    expect(userDB?.highestStreak).toBe(3);
  });

  test("should retrieve top winning streaks", async () => {
    const email = "mytest@example.com";
    const password = "isRightPassword";
    const name = "MyTest User";
    let currentWinningStreak = 2;
    let highestStreak = 3;
    const user = await createTestUser(
      email,
      password,
      name,
      currentWinningStreak,
      highestStreak
    );

    const topUsers = await getTopWinningStreaks(2);
    expect(topUsers.length).toBeGreaterThan(0);
    expect(topUsers[0].highestStreak).toBeGreaterThanOrEqual(
      topUsers[topUsers.length - 1].highestStreak
    );
  });
  test("should be null for no activity", async () => {
    // scheduleGames();

    expect(getActiveTimeoutId()).toBeNull();
  });
});
