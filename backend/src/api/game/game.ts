import express, { Router } from "express";
import { auth } from "../../utils/auth";
import betGame from "./game-bet";
import getKTopLeaderBoard from "./game-top-leaders";
import { body } from "express-validator";
import { startGameScheduling, stopGameScheduling } from "./game-management";

const gameRouter: Router = express.Router();

gameRouter.post(
  "/bet",
  auth,
  [
    body("guess").isBoolean().withMessage("Guess must be a boolean value"),
    body("gameId").isMongoId().withMessage("gameId must be a valid Id"),
  ],
  betGame
);

gameRouter.get("/leaderboard/:limit", auth, getKTopLeaderBoard);

// trigger game, future edit -> Only Admins can trigger game
gameRouter.post("/start", auth, startGameScheduling);
gameRouter.post("/stop", auth, stopGameScheduling);

export default gameRouter;
