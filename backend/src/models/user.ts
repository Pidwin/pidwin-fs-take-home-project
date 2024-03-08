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

  @prop({ type: () => Wager, required: true })
  lastTenWagers: Wager[];
}

/**
 * A wager of the coin game.
 */
class Wager implements IWager {
  @prop({ required: true })
  initialBalance: number;

  @prop({ required: true })
  tokensWagered: number;

  @prop({ required: true })
  wageredHeads: boolean;

  @prop({ required: true })
  wagerWon: boolean;

  @prop({ required: true })
  netWin: number;

  @prop({ type: Number, nullable: true })
  bonusMultiplierAwarded: number | null;
}

export const UserModel = getModelForClass(User);
