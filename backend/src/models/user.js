import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: { type: Number, default: 100 },
  coinTosses: [
    {
      win: { type: Boolean },
      bonus: { type: Boolean, default: false },
      megaBonus: { type: Boolean, default: false },
      wager: { type: Number },
      guess: { type: String },
      result: { type: String },
    },
  ],
});

export default mongoose.model("User", userSchema);
