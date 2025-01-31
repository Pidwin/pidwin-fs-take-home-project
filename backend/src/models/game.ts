import mongoose, { Schema } from "mongoose";
import { IGame } from "../types/game.interface";

const gameSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rollValues: {
    type: [Number],
    default: null,
  },
  isLucky: {
    type: Boolean,
    default: null,
  },
  // Betting window closes 10 seconds after game starts
  bettingEndsAt: {
    type: Date,
    required: true,
  },
  // Game ends 15 seconds after game starts
  gameEndsAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model<IGame>("Game", gameSchema);

export default Game;
