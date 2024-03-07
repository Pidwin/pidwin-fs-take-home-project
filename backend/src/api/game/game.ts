import express from "express";
import auth from "../../utils/auth";
import fetchGame from "./game-fetch";
import wager from "./game-wager";

const router = express.Router();

router.get("/fetch", auth, fetchGame);
router.post("/wager", auth, wager);

export default router;
