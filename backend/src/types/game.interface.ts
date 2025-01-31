import mongoose, { Document } from "mongoose";

export interface GameMessage {
  type: string;
  message: string;
  result: "win" | "loss";
}

export interface IGame extends Document {
  _id: mongoose.Types.ObjectId;
  rollValues?: number[];
  isLucky?: boolean;
  bettingEndsAt: Date;
  gameEndsAt: Date;
}
