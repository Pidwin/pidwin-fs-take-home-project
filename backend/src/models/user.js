import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  // Tracks the current winning streak
  currentWinningStreak: {
    type: Number,
    default: 0,
  },
  // Tracks the highest streak the user ever achieved
  highestStreak: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
