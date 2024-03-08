import { getModelForClass } from "@typegoose/typegoose";
import request from "supertest";
import { app } from "backend";
import { IUser } from "shared/interfaces";
import * as random from "../../utils/rand";

jest.mock("@typegoose/typegoose", () => {
  const originalModule = jest.requireActual("@typegoose/typegoose");
  return {
    ...originalModule,
    getModelForClass: jest.fn(),
  };
});

jest.mock("backend/src/utils/auth", () => ({
  __esModule: true,
  default: jest.fn((req, res, next) => {
    req.params.userId = "test";
    next();
  }),
}));

describe("game-wager", () => {
  let mockModel: any;
  beforeEach(() => {
    mockModel = {
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };
    (getModelForClass as jest.Mock).mockReturnValue(mockModel);
  });

  it("should fail if the user does not exist", async () => {
    // Create a null mock user
    mockModel.findOne.mockResolvedValueOnce(null);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Expect the response status to be 404 because the user does not exist
    expect(response.status).toBe(404);
  });

  it("should fail if the user bets 0 or fewer tokens", async () => {
    // Create a mock user
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 1,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };
    mockModel.findOne.mockResolvedValueOnce(mockUser);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 0 });

    // Expect the response status to be 400 because the wager was invalid
    expect(response.status).toBe(400);
  });

  it("should fail if the user bets more tokens than they have", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 1,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    // Create a mock user
    mockModel.findOne.mockResolvedValueOnce(mockUser);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 101 });

    // Expect the response status to be 400 because the user does not exist
    expect(response.status).toBe(400);
  });

  it("should award a 2x bonus payout if the user wins without earning a bonus payout", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 1,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    const expectedResult = {
      numTokens: 101,
      lastTenWagers: [
        ...mockUser.lastTenWagers,
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    // Set up mocks
    mockModel.findOne.mockResolvedValueOnce(mockUser);
    mockModel.findByIdAndUpdate.mockResolvedValueOnce({
      ...mockUser,
      ...expectedResult,
      winStreak: mockUser.winStreak + 1,
    });
    jest.spyOn(random, "getRandomBoolean").mockReturnValueOnce(true);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Assert 2x bonus payout
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "test",
      {
        numTokens: expectedResult.numTokens,
        lastTenWagers: expectedResult.lastTenWagers,
        winStreak: 2,
      },
      { new: true }
    );
  });

  it("should award a 3x bonus payout if the user wins 3 times in a row", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 2,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    const expectedResult = {
      numTokens: 102,
      lastTenWagers: [
        ...mockUser.lastTenWagers,
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 2,
          bonusAwarded: true,
        },
      ],
    };

    // Create a mock user
    mockModel.findOne.mockResolvedValueOnce(mockUser);
    mockModel.findByIdAndUpdate.mockResolvedValueOnce({
      ...mockUser,
      ...expectedResult,
      winStreak: mockUser.winStreak + 1,
    });
    jest.spyOn(random, "getRandomBoolean").mockReturnValueOnce(true);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Assert 3x bonus payout
    expect(response.status).toBe(200);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "test",
      {
        numTokens: expectedResult.numTokens,
        lastTenWagers: expectedResult.lastTenWagers,
        winStreak: 3,
      },
      { new: true }
    );
    expect(response.body).toEqual(expectedResult);
  });

  it("should award a 10x bonus payout and reset win streak if the user wins 5 times in a row", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 4,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    const expectedResult = {
      numTokens: 109,
      lastTenWagers: [
        ...mockUser.lastTenWagers,
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 9,
          bonusAwarded: true,
        },
      ],
    };

    // Create a mock user
    mockModel.findOne.mockResolvedValueOnce(mockUser);
    mockModel.findByIdAndUpdate.mockResolvedValueOnce({
      ...mockUser,
      ...expectedResult,
      winStreak: 0,
    });
    jest.spyOn(random, "getRandomBoolean").mockReturnValueOnce(true);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Assert 10x bonus payout
    expect(response.status).toBe(200);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "test",
      {
        numTokens: expectedResult.numTokens,
        lastTenWagers: expectedResult.lastTenWagers,
        winStreak: 0,
      },
      { new: true }
    );
    expect(response.body).toEqual(expectedResult);
  });

  it("should reset the users win streak if they lose", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 4,
      lastTenWagers: [
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        },
      ],
    };

    const expectedResult = {
      numTokens: 99,
      lastTenWagers: [
        ...mockUser.lastTenWagers,
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: false,
          netWin: -1,
          bonusAwarded: false,
        },
      ],
    };

    // Create a mock user
    mockModel.findOne.mockResolvedValueOnce(mockUser);
    mockModel.findByIdAndUpdate.mockResolvedValueOnce({
      ...mockUser,
      ...expectedResult,
      winStreak: 0,
    });
    jest.spyOn(random, "getRandomBoolean").mockReturnValueOnce(false);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Assert win streak reset
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "test",
      {
        numTokens: expectedResult.numTokens,
        lastTenWagers: expectedResult.lastTenWagers,
        winStreak: 0,
      },
      { new: true }
    );
  });

  it("should record the users last wager even if the lastTen array is full", async () => {
    const mockUser: IUser = {
      _id: "test",
      name: "Gabriel Diaz",
      email: "gabrield@yahoo.com",
      password: "password123",
      numTokens: 100,
      winStreak: 4,
      lastTenWagers: [
        ...Array(10).fill({
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: true,
          netWin: 1,
          bonusAwarded: false,
        }),
      ],
    };

    const expectedResult = {
      numTokens: 99,
      lastTenWagers: [
        ...mockUser.lastTenWagers.slice(1),
        {
          initialBalance: 100,
          tokensWagered: 1,
          wageredHeads: true,
          wagerWon: false,
          netWin: -1,
          bonusAwarded: false,
        },
      ],
    };

    // Create a mock user
    mockModel.findOne.mockResolvedValueOnce(mockUser);
    mockModel.findByIdAndUpdate.mockResolvedValueOnce({
      ...mockUser,
      ...expectedResult,
      winStreak: 0,
    });
    jest.spyOn(random, "getRandomBoolean").mockReturnValueOnce(false);

    // Make a POST request to wager
    const response = await request(app)
      .post("/api/game/wager")
      .send({ wageredHeads: true, tokensWagered: 1 });

    // Assert that the last wager was recorded
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "test",
      {
        numTokens: expectedResult.numTokens,
        winStreak: 0,
        lastTenWagers: expectedResult.lastTenWagers,
      },
      { new: true }
    );
  });
});
