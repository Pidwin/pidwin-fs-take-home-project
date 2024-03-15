import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import wagerHistory from "./user-wager-history.js";
import wager from "./user-wager.js";
import userTokenBalance from "./user-token-balance.js";
import changePassword from "./user-change-password.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/wager", auth, wager);
router.post("/wager-history", auth, wagerHistory);
router.post("/token-balance", auth, userTokenBalance);
router.post("/changePassword", auth, changePassword);

export default router;
