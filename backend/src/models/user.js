import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: { type: Number, required: true, default: 100 },
  bonusStreak: { type: Number, required: true, default: 0 },
});

export default mongoose.model("User", userSchema);