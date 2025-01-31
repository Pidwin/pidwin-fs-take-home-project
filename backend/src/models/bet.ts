import mongoose, { Schema } from "mongoose";
import { IBet } from "../types/bet.interace";

const betSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guess: {
    type: Boolean,
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  // Null until the game result is calculated
  isWinner: {
    type: Boolean,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Bet = mongoose.model<IBet>("Bet", betSchema);

export default Bet;
