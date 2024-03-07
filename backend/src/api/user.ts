import express from "express";
import auth from "../utils/auth";
import changePassword from "./user-change-password";
import login from "./user-login";
import signup from "./user-signup";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);

export default router;
