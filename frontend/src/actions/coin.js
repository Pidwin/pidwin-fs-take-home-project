import { TOSS_COIN, UPDATE_TOKEN_COUNT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const tossCoin = (wager, choice) => async (dispatch) => {
  const messageResult = (result) => {
    if (result.megaBonus) {
      messages.info("!! MEGA BONUS !!");
    } else if (result.bonus) {
      messages.warning("BONUS");
    } else if (result.win) {
      messages.success("You Won!");
    } else {
      messages.error("You Lost!");
    }
  };

  try {
    const { data } = await api.tossCoin({ wager, choice });
    dispatch({ type: TOSS_COIN, data: data.history });
    dispatch({ type: UPDATE_TOKEN_COUNT, data: data.tokens });
    // messages.info("Coin Tossed");
    messageResult(data.history[data.history.length - 1]);
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
