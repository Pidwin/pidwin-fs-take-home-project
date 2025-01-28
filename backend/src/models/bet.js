import mongoose from "mongoose";

const betSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   amount: { type: Number, required: true },
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
const Bet = mongoose.model("Bet", betSchema);

export default Bet;
