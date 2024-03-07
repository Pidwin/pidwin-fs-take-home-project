/**
 * The shape of the response to a successful login request.
 */
export type GameFetchResponse = {
  numTokens: number;
};

/**
 * The shape of the input required for a wager.
 */
export type GameWagerInput = {
  /**
   * The side the user made their wager on (0 = head, 1 = tails).
   */
  sideWagered: 0 | 1;

  /**
   * The number of tokens the user risked on the wager.
   */
  tokensWagered: number;
};
