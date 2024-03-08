import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  ChangePasswordInput,
  LoginInput,
  LoginResponse,
  SignupInput,
} from "shared/interfaces";
import * as api from "../api";
import * as messages from "../messages";
import { CLEAR_GAME } from "../reducers/game";
import { LOGIN, LOGOUT } from "../reducers/login";

/**
 * Creates a user.
 */
export const signup = createAsyncThunk(
  "login/loginAttempt",
  async (
    thunkArg: { input: SignupInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      const result: AxiosResponse<LoginResponse> = await api.signup(input);
      thunkAPI.dispatch(LOGIN(result.data));
      history("/");
      messages.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);

/**
 * Logs a user in.
 */
export const login = createAsyncThunk(
  "login/loginAttempt",
  async (
    thunkArg: { input: LoginInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      const result: AxiosResponse<LoginResponse> = await api.login(input);
      thunkAPI.dispatch(LOGIN(result.data));
      history("/");
      messages.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);

/**
 * Changes a user's password.
 */
export const changePassword = createAsyncThunk(
  "login/changePassword",
  async (
    thunkArg: { input: ChangePasswordInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      await api.changePassword(input);
      thunkAPI.dispatch(LOGOUT());
      thunkAPI.dispatch(CLEAR_GAME());
      messages.success("Password Change Was Successful");
      history("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);
