import { jwtDecode } from "jwt-decode";
import { SET_TOKEN_BALANCE } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const loadUserTokenBalance = (userEmail) => async (dispatch) => {
  try {
    const { data } = await api.tokenBalance({ email: userEmail });
    const decodedResult = jwtDecode(data.token);
    dispatch({
      type: SET_TOKEN_BALANCE,
      data: decodedResult.tokenBalance,
    });
  } catch (error) {
    console.log("error", error);
    messages.error(error.response.data.message);
  }
};
