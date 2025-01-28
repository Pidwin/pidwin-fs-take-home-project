import Game from "../../models/game.js";
import Bet from "../../models/bet.js";
import user from "../../models/user.js";
import { validationResult } from "express-validator";
const betGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, guess, gameId } = req.body;

    const userDB = await user.findById(req.userId);
    if (!userDB) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const now = new Date();

    if (now >= new Date(game.bettingEndsAt)) {
      return res
        .status(400)
        .json({ error: "Betting is closed for this game." });
    }

    // Check if the user has already placed a bet on this game
    const existingBet = await Bet.findOne({
      userId: req.userId,
      gameId: gameId,
    });

    if (existingBet) {
      return res
        .status(400)
        .json({ error: "You have already placed a bet on this game." });
    }

    const newBet = await Bet.create({
      userId: req.userId,
      gameId: gameId,
      guess: guess,
    });

    return res
      .status(200)
      .json({ message: "Bet placed successfully", bet: newBet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default betGame;
