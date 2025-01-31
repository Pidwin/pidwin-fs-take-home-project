import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { validationResult } from "express-validator";
import { IUser } from "../../types/user.interface";

const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const existingUser: IUser | null = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ message: "Please create an Account" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Please check your Credentials" });
      return;
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export default login;
