import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  tokens: { type: Number },
  winStreak: { type: Number },
  recentResults: { type: Array },
});

export default mongoose.model("Game", gameSchema);
