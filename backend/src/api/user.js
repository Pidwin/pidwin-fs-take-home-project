import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import getTokens from "./user-get-tokens.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.get("/getTokens", auth, getTokens);

export default router;
