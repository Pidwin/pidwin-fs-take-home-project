import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  currentWinningStreak: number;
  highestStreak: number;
}
