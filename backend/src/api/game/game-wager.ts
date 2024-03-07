import { RequestHandler } from "express";
import { UserModel } from "../../models/user";
import { IWager } from "shared/interfaces";

const wager: RequestHandler = async (req, res) => {
  const { wageredHeads, tokensWagered } = req.body;

  try {
    // Verify that the user has been authenticated.
    if (!req.params.userId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    // Find the user.
    const user = await UserModel.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    // Verify that the user is allowed to wager.
    if (tokensWagered <= 0) {
      return res.status(400).json({
        message: "Invalid Wager Amount. You must wager at least one token.",
      });
    }
    if (tokensWagered > user.numTokens) {
      return res.status(400).json({
        message:
          "Invalid Wager Amount. You cannot wager more tokens than you have.",
      });
    }

    // Determine the result of the wager.
    const landedHeads = Math.random() < 0.5;
    const wagerWon = landedHeads === wageredHeads;

    // Calculate the user's new game state.
    let winStreak = wagerWon ? user.winStreak + 1 : 0;
    let numTokens = user.numTokens - tokensWagered;
    let bonusAwarded = false;
    if (wagerWon) {
      let multiplier = 2;
      if (winStreak === 3) {
        multiplier = 3;
        bonusAwarded = true;
      } else if (winStreak === 5) {
        multiplier = 10;
        winStreak = 0;
        bonusAwarded = true;
      }
      numTokens += tokensWagered * multiplier;
    }

    const wagerResult: IWager = {
      wageredHeads,
      tokensWagered,
      wagerWon,
      netWin: numTokens - user.numTokens,
      initialBalance: user.numTokens,
      bonusAwarded,
    };
    let lastTenWagers = [...user.lastTenWagers, wagerResult].slice(-10);

    // Update the user's balance.
    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      { numTokens, winStreak, lastTenWagers },
      { new: true }
    );
    if (!updateUser) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    res.status(200).json({ numTokens: updateUser.numTokens, lastTenWagers });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default wager;
