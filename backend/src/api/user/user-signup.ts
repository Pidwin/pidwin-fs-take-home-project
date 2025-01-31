import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { validationResult } from "express-validator";

const signup = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User Already Exists" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords Do Not Match" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export default signup;
