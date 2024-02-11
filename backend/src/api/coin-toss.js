import User from "../models/user.js";

export const tossCoin = async (req, res) => {
  console.log("Toss Coin has been called");
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  const { wager, choice } = req.body;
  console.log("wager: ", wager);
  console.log("choice: ", choice);
  console.log("userId: ", userId);

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    if (wager > existingUser.tokens) {
      return res.status(400).json({ message: "Not enough tokens" });
    }
    const result = Math.random() < 0.5 ? "heads" : "tails";

    console.log("result: ", result);

    let newTokens = 0;
    if (result === choice) {
      newTokens = existingUser.tokens + wager;
    } else {
      newTokens = existingUser.tokens - wager;
    }
    console.log("newTokens: ", newTokens);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        tokens: newTokens,
        $push: {
          coinTosses: {
            $each: [{ win: result === choice, wager, guess: choice, result }],
            $slice: -10,
          },
        },
      },
      { new: true }
    );
    console.log("updatedUser: ", updatedUser);

    res.status(200).json({
      tokens: updatedUser.tokens,
      history: updatedUser.coinTosses,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
