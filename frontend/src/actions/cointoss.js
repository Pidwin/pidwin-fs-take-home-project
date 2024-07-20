import { WAGER } from '../constants/actionTypes';
import {
  DEBIT_TOAST,
  WINNER_TOAST,
  CREDIT_TOAST,
  LOSER_TOAST,
  TOKENS_TOAST,
  BONUS_COINS_TOAST,
  BONUS_TOAST,
  BONUS_MAX_COINS,
  BONUS_MIN_COINS,
} from '../constants/cointoss';

import * as api from '../api';
import * as messages from '../messages';

export const wager = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.wager(formData);
    dispatch({ type: WAGER, data });
    history('/');

    messages.info(DEBIT_TOAST(data.wager));
    const rate = BigInt(data.rate) > BONUS_MAX_COINS
      ? BONUS_MAX_COINS : Number(data.rate);
    if (rate > 2n) {
      for (let i = rate; i > 0; i--) {
        messages.info(BONUS_COINS_TOAST(i < BONUS_MIN_COINS
          ? BONUS_MIN_COINS : i));
      }
      messages.info(BONUS_TOAST(rate));
    }
    if (data.winner) {
      messages.success(WINNER_TOAST);
      messages.info(CREDIT_TOAST(data.payout));
    } else {
      messages.warning(LOSER_TOAST);
    }
    messages.info(TOKENS_TOAST(data.tokens));

  } catch (error) {
    messages.error(error.response.data.message);
  }
};
