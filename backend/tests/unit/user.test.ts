import request from "supertest";
import { app } from "../..";
import bcrypt from "bcryptjs";
import User from "../../src/models/user";
import { createGame } from "../../src/services/gameService";
import Game from "../../src/models/game";
import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
dotenv.config();

// Helper function to create a test user
const createTestUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    email,
    password: hashedPassword,
    name: "Test User",
  });
};

describe("POST /login", () => {
  const email = "tester@example.com";
  const password = "isRightPassword";
  const incorrectPassword = "isWrongPassword";
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    } as ConnectOptions);

    await createTestUser(email, password);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Game.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should log in with correct credentials", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return error if user does not exist", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "fake@example.com", password });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User Does Not Exist");
  });

  it("should return error if password is incorrect", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email, password: incorrectPassword });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid Password");
  });

  test("should create a new game", async () => {
    const game = await createGame();
    const savedGame = await Game.findById(game._id);

    expect(savedGame).not.toBeNull();
    expect(savedGame?.bettingEndsAt).toBeDefined();
    expect(savedGame?.gameEndsAt).toBeDefined();
  });
});
