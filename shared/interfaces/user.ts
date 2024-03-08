/**
 * The shape of a user of the application.
 */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  numTokens: number;
  winStreak: number;
  lastTenWagers: IWager[];
}

/**
 * The shape of the results of a wager.
 */
export interface IWager {
  initialBalance: number;
  tokensWagered: number;
  wageredHeads: boolean;
  wagerWon: boolean;
  netWin: number;
  bonusMultiplierAwarded: number | null;
}
