import { Request, Response } from "express";
import Game from "../../models/game";
import Bet from "../../models/bet";
import User from "../../models/user";
import { validationResult } from "express-validator";

const betGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { amount, guess, gameId } = req.body;
    const userId = (req as any).userId;

    const userDB = await User.findById(userId);
    if (!userDB) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Check if game exists
    const game = await Game.findById(gameId);
    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    const now = new Date();
    if (now >= new Date(game.bettingEndsAt)) {
      res.status(400).json({ error: "Betting is closed for this game." });
      return;
    }

    // Check if the user has already placed a bet on this game
    const existingBet = await Bet.findOne({ userId, gameId });

    if (existingBet) {
      res
        .status(400)
        .json({ error: "You have already placed a bet on this game." });
      return;
    }

    const newBet = await Bet.create({
      userId,
      gameId,
      guess,
    });

    res.status(200).json({ message: "Bet placed successfully", bet: newBet });
    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
    return;
  }
};

export default betGame;
