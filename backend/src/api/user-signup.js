import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

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
    tokens: BigInt(process.env.STARTING_TOKENS),
  });
  const token = jwt.sign(
    {
      _id: result._id,
      name: result.name,
      email: result.email,
      password: result.hashedPassword,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    token,
    tokens: result.tokens.toString()
  });
};

export default signup;
