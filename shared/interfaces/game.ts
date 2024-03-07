import { IWager } from "./user";

/**
 * The shape of the response to a successful login request.
 */
export type GameFetchResponse = {
  numTokens: number;
  lastTenWagers: IWager[];
};

/**
 * The shape of the input required for a wager.
 */
export type GameWagerInput = {
  /**
   * Whether the user wagered on heads (otherwise tails).
   */
  wageredHeads: boolean;

  /**
   * The number of tokens the user risked on the wager.
   */
  tokensWagered: number;
};
