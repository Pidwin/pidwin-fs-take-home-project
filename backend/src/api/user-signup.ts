import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const signup: RequestHandler = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Does Not Match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      {
        _id: result._id,
        name: result.name,
        email: result.email,
        password: result.password,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export default signup;
