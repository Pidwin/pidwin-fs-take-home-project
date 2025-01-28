import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rollValues: {
    type: [Number],
    default: null,
  },
  // (Note)
  // You can also game type to make this work for various dice based games
  // You can change isLucky to a field to hold the required result
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

const Game = mongoose.model("Game", gameSchema);

export default Game;
