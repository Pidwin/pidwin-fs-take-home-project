import { UPDATE_TOKEN_COUNT } from "../constants/actionTypes";

export const updateTokenCount = (newTokenCount) => async (dispatch) => {
  dispatch({ type: UPDATE_TOKEN_COUNT, data: newTokenCount });
};
