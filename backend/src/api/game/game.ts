import express from "express";
import auth from "../../utils/auth";
import fetchGame from "../game/fetch-game";

const router = express.Router();

router.get("/fetch", auth, fetchGame);

export default router;
