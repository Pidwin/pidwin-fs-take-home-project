import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Game from "../models/game.js";

const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Does Not Match" });
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
        password: result.hashedPassword,
      },
      "test",
      { expiresIn: "5d" }
    );

    await Game.create({
      email,
      tokens: 100,
      winStreak: 0,
      recentResults: [],
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up" });
    console.log(error);
  }
};

export default signup;
