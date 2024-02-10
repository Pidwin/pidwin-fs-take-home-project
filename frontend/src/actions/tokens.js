import { GET_TOKENS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const getTokens = () => async (dispatch) => {
  try {
    const { data } = await api.getTokens();
    dispatch({ type: GET_TOKENS, payload: data.tokens });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
