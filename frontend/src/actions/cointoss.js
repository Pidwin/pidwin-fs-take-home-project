import { WAGER } from '../constants/actionTypes';
import {
  DEBIT_TEXT,
  WINNER_TEXT,
  CREDIT_TEXT,
  LOSER_TEXT,
  TOKENS_TEXT,
} from '../constants/cointoss';

import * as api from '../api';
import * as messages from '../messages';

export const wager = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.wager(formData);
    dispatch({ type: WAGER, data });
    history('/');
    messages.info(DEBIT_TEXT.format(data.wager));
    if (data.winner) {
      messages.success(WINNER_TEXT.toString());
      messages.info(CREDIT_TEXT.format(data.payout));
    } else {
      messages.warning(LOSER_TEXT.format(data.tokens));
    }
    messages.info(TOKENS_TEXT.format(data.tokens));
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
