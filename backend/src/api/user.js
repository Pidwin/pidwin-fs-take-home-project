import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import top10WinStreak from './user-get-top-10-winstreaks.js'
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.get("/top10WinStreak",auth, top10WinStreak)

export default router;
