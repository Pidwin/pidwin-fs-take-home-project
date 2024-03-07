/**
 * The shape of a user of the application.
 */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  numTokens: number;
}
