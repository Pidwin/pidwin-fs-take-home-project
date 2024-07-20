import React from 'react';

export const BACK_TO_GAME_TEXT = '👈 Back to Game';
export const HOW_TO_PLAY_TEXT = '🆘 How to Play';

export const HISTORY_TEXT = '🗿 History';
export const HISTORY_TEXT_YOU_WON = (payout) => `🎉🎉🎉 You won ${payout}`;
export const HISTORY_TEXT_YOU_LOST = (wager) => `💔😿 You lost ${wager}`;

export const WELCOME_TEXT = '🙋 Welcome to CoinToss!';
export const WELCOME_SUB_TEXT = '👉 A game of probability and statistics 📊 ... With origins stemming back to the Roman Empire! 👴';

export const GETTING_STARTED_TEXT = '🏗️ Getting Started';
export const GETTING_STARTED_STEP_1_PRIMARY_TEXT = <>💰 Set a <b>Wager</b></>;
export const GETTING_STARTED_STEP_1_SECONDARY_TEXT = (min, max) => `min wager: ${min}; max wager: ${max}`;
export const GETTING_STARTED_STEP_2_PRIMARY_TEXT = <>Choose <b>Heads</b> 😼 or <b>Tails</b> 🐕</>;
export const GETTING_STARTED_STEP_3_PRIMARY_TEXT = <>👊 Smack that <b>Lucky</b> button</>;

export const REWARD_SYSTEM_TEXT = '🏆 Game Rewards';
export const REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT = 'Single wins are paid at 2:1 odds, where the first number tells you how much you could win, and the second number is the amount you bet. So,  you\'ll get 2 tokens for every 1 token you wager (and win).';
export const REWARD_SYSTEM_TEXT_STEP_2_PRIMARY_TEXT = 'Bonuses are paid out for every third (3:1 odds) and fifth (10:1 odds) consecutive win. Must win three games for the first bonus payout and a further two games for the second bonus payout. This bonus caps out at 10:1 odds and resets after it has been paid out for the fifth consecutive win.';

export const WAGER_TEXT = 'Wager';
export const HEADS_TEXT = 'Heads';
export const TAILS_TEXT = 'Tails';
export const WAGER_BUTTON_TEXT = 'Feeling Lucky?';

export const HISTORY_OPEN_BY_DEFAULT = false;
export const HOW_TO_PLAY_OPEN_BY_DEFAULT = false;
export const DEFAULT_WAGER = 1;
export const MIN_WAGER = 1;
export const DEFAULT_GUESS = TAILS_TEXT.toLowerCase();

export const DEBIT_TOAST = (wager) => <>{wager} tokens vanished into thin air! 💨💨</>;
export const WINNER_TOAST = <>Winner winner chicken dinner! 🍽️🍗</>;
export const CREDIT_TOAST = (payout) => <>🎉🎉🎉 Congrats!<br />Here&apos;s {payout} more tokens!</>;
export const LOSER_TOAST = <>Seems luck was not on your side! 💔😿</>;
export const TOKENS_TOAST = (tokens) => <>A whopping {tokens} tokens left, champ! 😮</>;
export const BONUS_COINS_TOAST = (rate) => <>{[...Array(rate)].map(() => '🪙').join('')}</>;
export const BONUS_TOAST = (rate) => <>Dang, you hit the x{rate} jackpot! 🌟😎</>;
export const BONUS_MAX_COINS = 10;
export const BONUS_MIN_COINS = 3;
