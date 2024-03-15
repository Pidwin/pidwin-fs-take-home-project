import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Wager from "../models/wager.js";

const wagerHistory = async (req, res) => {
  const { email } = req.body;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    const recentWagers = await Wager.find({ email: email })
      .sort({ createdAt: -1 })
      .limit(10);

    const token = jwt.sign(
      {
        _id: existingUser._id,
        recentWagers: recentWagers,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default wagerHistory;
