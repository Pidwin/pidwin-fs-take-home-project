import { BET_GAME, GAME_RESULT, LOGIN, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const betGameAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.betGame(formData);
    dispatch({ type: BET_GAME, data });
    messages.success("Bet Successful");
  } catch (error) {
    console.log(error);
    messages.error(error.response.data.message);
  }
};

export const showResultAction = (resultData) => async (dispatch) => {
  if (resultData.result === "win") {
    messages.success(resultData.message);
  } else {
    messages.error(resultData.message);
  }
};
