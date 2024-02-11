import User from "../models/user.js";

export const getMostRecentCoinToss = async (req, res) => {
  console.log("Get Most Recent Result has been called");
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  console.log("userId: ", userId);

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    const result = existingUser.coinTosses[existingUser.coinTosses.length - 1];
    console.log("result: ", result);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCoinTossHistory = async (req, res) => {
  console.log("Get Coin Toss History has been called");
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  console.log("userId: ", userId);

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    const history = existingUser.coinTosses;
    console.log("history: ", history);

    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
