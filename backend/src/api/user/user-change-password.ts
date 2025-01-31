import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../../types/auth.interface";

const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, oldPassword, newPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ message: "User Does Not Exist" });
      return;
    }

    if (!req.userId) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatePassword);
    return;
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export default changePassword;
