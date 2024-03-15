import mongoose from "mongoose";

const wagerSchema = mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  flipWasHeads: { type: Boolean, required: true },
  payoutAmount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Wager", wagerSchema);