import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import auth from "../utils/auth.js";
import tossCoin from "./user-toss-coin.js";
import userProfile from "./user-profile.js";
import logout from "./user-logout.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/toss-coin", auth, tossCoin);
router.get("/profile", auth, userProfile)

export default router;
