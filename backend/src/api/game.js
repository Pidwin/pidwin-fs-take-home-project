import express from "express";
import flipCoin from "./game-flip-coin.js";
import fetchGame from "./game-fetch.js";

const router = express.Router();

router.post("/flipCoin", flipCoin);
router.post("/fetch", fetchGame);

export default router;
