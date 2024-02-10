import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: { type: Number, default: 100 },
});

export default mongoose.model("User", userSchema);
