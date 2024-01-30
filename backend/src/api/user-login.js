import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        tokens: existingUser.tokens
      },
      "test",
      {expiresIn:"1h"});

    res.cookie('token', 'Bearer ' + token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 // 1 hour
    });

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default login;
