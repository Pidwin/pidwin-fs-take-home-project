import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.interface";

const userSchema: Schema = new Schema({
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;
