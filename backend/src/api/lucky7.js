import express from "express";
import betOnLucky7 from './user-bet-on-lucky7.js'

import auth from "../utils/auth.js";

const router = express.Router();


router.post("/betOnLucky7",auth, betOnLucky7)

export default router;