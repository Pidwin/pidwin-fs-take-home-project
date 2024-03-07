import { RequestHandler } from "express";
import { UserModel } from "../../models/user";

const wager: RequestHandler = async (req, res) => {
  const { sideWagered, tokensWagered } = req.body;

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
    const flipResult = Math.round(Math.random());
    const wagerWon = flipResult === sideWagered;
    let result = user.numTokens - tokensWagered;
    if (wagerWon) {
      result += tokensWagered * 2;
    }

    // Update the user's balance.
    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      { numTokens: result },
      { new: true }
    );
    if (!updateUser) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    res.status(200).json({ numTokens: updateUser.numTokens, wagerWon });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default wager;
