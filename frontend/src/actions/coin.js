import { TOSS_COIN, UPDATE_TOKEN_COUNT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const tossCoin = (wager, choice) => async (dispatch) => {
  try {
    const { data } = await api.tossCoin({ wager, choice });
    console.log(data);
    console.log(data.history);
    dispatch({ type: TOSS_COIN, data: data.history });
    dispatch({ type: UPDATE_TOKEN_COUNT, data: data.tokens });
    messages.success("Coin Tossed");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
