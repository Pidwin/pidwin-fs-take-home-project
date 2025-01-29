import * as api from "../api";
import * as messages from "../messages";
import { LOGIN, LOGOUT, SET_TOKEN_BALANCE } from "../constants/actionTypes";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: LOGIN, data });
    dispatch({ type: SET_TOKEN_BALANCE, data: 100 });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: LOGOUT, data });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
