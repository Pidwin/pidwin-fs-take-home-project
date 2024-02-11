import { GET_TOKENS, UPDATE_TOKEN_COUNT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const updateTokenCount = (newTokenCount) => async (dispatch) => {
  dispatch({ type: UPDATE_TOKEN_COUNT, data: newTokenCount });
};
