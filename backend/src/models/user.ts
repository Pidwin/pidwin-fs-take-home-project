import { getModelForClass, prop } from "@typegoose/typegoose";
import { IUser } from "shared/interfaces";

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
}

export const UserModel = getModelForClass(User);
