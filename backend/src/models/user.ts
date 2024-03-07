import { getModelForClass, prop } from "@typegoose/typegoose";
import { IUser, IWager } from "shared/interfaces";

/**
 * A user of the application.
 */
export class User implements IUser {
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  numTokens: number;

  @prop({ required: true })
  winStreak: number;

  @prop({ required: true })
  lastTenWagers: IWager[];
}

export const UserModel = getModelForClass(User);
