import * as api from "../api";
import {TOSS_COIN} from "../constants/actionTypes";
import * as messages from "../messages";

export const tossCoin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.tossCoin(formData);
    dispatch({ type: TOSS_COIN, data });
    history("/");
    messages.success(`Coin was tossed! You ${data.message} ${formData.wager} tokens!`);
  } catch (error) {
    messages.error(error.message);
  }
};
