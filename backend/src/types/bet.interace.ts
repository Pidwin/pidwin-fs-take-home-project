import mongoose, { Document } from "mongoose";

export interface IBet extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  guess: boolean;
  isWinner?: boolean;
}
