import { SET_COIN_TOSS_RESULT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";
import { updateTokenCount } from "./tokens";

export const setCoinTossResult = (result) => async (dispatch) => {
  dispatch({ type: SET_COIN_TOSS_RESULT, payload: result });
};

export const tossCoin = (wager, choice) => async (dispatch) => {
  try {
    const { data } = await api.tossCoin({ wager, choice });
    dispatch(updateTokenCount(data.newTokens));
    dispatch(setCoinTossResult(data.result));
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
