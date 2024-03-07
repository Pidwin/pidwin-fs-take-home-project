import { RequestHandler } from "express";
import { UserModel } from "../../models/user";

/**
 * Services a user's request to get their current game state.
 */
const fetchGame: RequestHandler = async (req, res) => {
  try {
    // Verify that the user has been authenticated.
    if (!req.params.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    // Find and return the user's current game state.
    const existingUser = await UserModel.findOne({ _id: req.params.userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    res.status(200).json({ numTokens: existingUser.numTokens });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default fetchGame;
