import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userTokenBalance = async (req, res) => {
  const { email } = req.body;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        tokenBalance: existingUser.tokens,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default userTokenBalance;
