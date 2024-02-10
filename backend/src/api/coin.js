import express from "express";
import { tossCoin } from "./coin-toss.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/toss", auth, tossCoin);

export default router;
