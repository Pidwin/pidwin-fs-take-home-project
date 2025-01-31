import express from "express";
import login from "./user-login";
import signup from "./user-signup";
import changePassword from "./user-change-password";
import { auth } from "../../utils/auth";
import getUserBets from "./user-bets";
import getUserStreakInformation from "./user-streaks";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  login
);
router.post(
  "/signup",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Must confirm your password"),
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Must provide your first name"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Must provide your last name"),
  ],
  signup
);
router.post(
  "/changePassword",
  auth,
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Must provide your old password"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Must provide your new password"),
  ],
  changePassword
);
router.get("/bets", auth, getUserBets);
router.get("/streaks", auth, getUserStreakInformation);

export default router;
