import * as api from "../api";
import {GET_USER} from "../constants/actionTypes";

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    dispatch({ type: GET_USER, data });
  } catch (error) {
    console.log(error.message)
  }
};
