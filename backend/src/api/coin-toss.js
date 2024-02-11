import User from "../models/user.js";

export const tossCoin = async (req, res) => {
  console.log("Toss Coin has been called");
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  const { wager, choice } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    if (wager > existingUser.tokens) {
      return res.status(400).json({ message: "Not enough tokens" });
    }
    const result = Math.random() < 0.5 ? "heads" : "tails";

    let newTokens = 0;
    let megaBonus = false;
    let bonus = false;

    if (result === choice) {
      existingUser.streak += 1;

      if (existingUser.streak === 5) {
        megaBonus = true;
        newTokens = existingUser.tokens + wager * 9;
        existingUser.streak = 0;
      } else if (existingUser.streak === 3) {
        bonus = true;
        newTokens = existingUser.tokens + wager * 2;
      } else {
        newTokens = existingUser.tokens + wager;
      }
    } else {
      newTokens = existingUser.tokens - wager;
      existingUser.streak = 0;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        tokens: newTokens,
        streak: existingUser.streak,
        $push: {
          coinTosses: {
            $each: [
              {
                win: result === choice,
                bonus,
                megaBonus,
                wager,
                guess: choice,
                result,
              },
            ],
            $slice: -10,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      tokens: updatedUser.tokens,
      history: updatedUser.coinTosses,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
