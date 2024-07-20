import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: { type: BigInt, default: BigInt(process.env.STARTING_TOKENS) },
  consecutive: { type: Number, default: 0 },
  history: [{
    answer: { type: String, required: true },
    consecutive: { type: Number, required: true },
    guess: { type: String, required: true },
    payout: { type: BigInt, required: true },
    rate: { type: BigInt, required: true },
    tokens: { type: BigInt, required: true },
    wager: { type: BigInt, required: true },
    winner: { type: Boolean, required: true },
  }],
});

export default mongoose.model("User", userSchema);
