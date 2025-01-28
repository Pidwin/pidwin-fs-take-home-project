import express from "express";

import { auth } from "../../utils/auth.js";
import betGame from "./game-bet.js";
import getKTopLeaderBoard from "./game-top-leaders.js";
const gameRouter = express.Router();
import { body } from "express-validator";
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

export default gameRouter;
