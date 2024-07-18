class Const extends String {
  format(...args) {
    return this.replace(/{([0-9]+)}/g, (match, index) => {
      return typeof args[index] === 'undefined' ? match : args[index];
    });
  }
  toBoolean() {
    return this.toString() === 'true' || this.toNumber() === 1 ? true : false;
  }
  toKey() {
    return this.toLowerCase().replaceAll(' ', '-');
  }
  toNumber() {
    return Number(this);
  }
}

export const CLICK_AWAY_OPEN_BY_DEFAULT = new Const(false);
export const DEFAULT_WAGER = new Const(0);
export const MIN_WAGER = new Const(1);

export const BACK_TO_GAME_TEXT = new Const('Back to Game');
export const HOW_TO_PLAY_TEXT = new Const('How to Play');
export const WELCOME_TEXT = new Const('Welcome to CoinToss!');
export const WELCOME_SUB_TEXT = new Const('A game of probability and statistics... With origins stemming back to the Roman Empire!');
export const GETTING_STARTED_TEXT = new Const('Getting Started');
export const GETTING_STARTED_STEP_1_PRIMARY_TEXT = new Const('Set a <b>Wager</b>...');
export const GETTING_STARTED_STEP_1_SECONDARY_TEXT = new Const(`min wager: {0}; max wager: {1}`);
export const GETTING_STARTED_STEP_2_PRIMARY_TEXT = new Const('Choose <b>Heads</b> or <b>Tails</b>...');
export const GETTING_STARTED_STEP_3_PRIMARY_TEXT = new Const('Smack that <b>Lucky</b> button!');
export const REWARD_SYSTEM_TEXT = new Const('Game Rewards');
export const REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT = new Const('Single wins are paid at 2:1 odds, where the first number tells you how much you could win, and the second number is the amount you bet. So,  you\'ll get 2 tokens for every 1 token you wager (and win).');
export const WAGER_TEXT = new Const('Wager');
export const HEADS_TEXT = new Const('Heads');
export const TAILS_TEXT = new Const('Tails');
export const WAGER_BUTTON_TEXT = new Const('Feeling Lucky?');

export const DEBIT_TEXT = new Const('{0} tokens vanished into thin air!');
export const WINNER_TEXT = new Const('Winner winner chicken dinner!');
export const CREDIT_TEXT = new Const('Congrats! You\'ve got {0} more tokens!');
export const LOSER_TEXT = new Const('Seems luck was not on your side!');
export const TOKENS_TEXT = new Const('You\'ve got {0} tokens left, champ!');

export const DEFAULT_GUESS = TAILS_TEXT;
