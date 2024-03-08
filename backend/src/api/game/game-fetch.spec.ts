import { getModelForClass } from "@typegoose/typegoose";
import { app } from "backend";
import { IUser } from "shared/interfaces";
import request from "supertest";

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

describe("fetchGame", () => {
  let mockModel: any;

  beforeEach(() => {
    mockModel = {
      findOne: jest.fn(),
    };
    (getModelForClass as jest.Mock).mockReturnValue(mockModel);
  });

  it("should fail if the user does not exist", async () => {
    // Create a null mock user
    mockModel.findOne.mockResolvedValueOnce(null);

    // Make a GET request to fetch the game state
    const response = await request(app).get("/api/game/fetch").send();

    // Expect the response status to be 404 because the user does not exist
    expect(response.status).toBe(404);
  });

  it("should return the user's data if they do exist", async () => {
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
          bonusMultiplierAwarded: null,
        },
      ],
    };
    mockModel.findOne.mockResolvedValueOnce(mockUser);

    // Make a GET request to fetch the game state
    const response = await request(app).get("/api/game/fetch").send();

    // Assert that the response status is 200
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      numTokens: mockUser.numTokens,
      lastTenWagers: mockUser.lastTenWagers,
    });
  });
});
