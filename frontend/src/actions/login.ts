import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  IChangePasswordInput,
  ILoginInput,
  ISignupInput,
} from "shared/interfaces";
import * as api from "../api";
import * as messages from "../messages";
import { LOGIN, LOGOUT } from "../reducers/login";

export const signup = createAsyncThunk(
  "login/loginAttempt",
  async (
    thunkArg: { input: ISignupInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      const { data } = await api.signup(input);
      thunkAPI.dispatch(LOGIN(data));
      history("/");
      messages.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "login/loginAttempt",
  async (
    thunkArg: { input: ILoginInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      const { data } = await api.login(input);
      thunkAPI.dispatch(LOGIN(data));
      history("/");
      messages.success("Login Successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "login/changePassword",
  async (
    thunkArg: { input: IChangePasswordInput; history: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const { input, history } = thunkArg;
      await api.changePassword(input);
      thunkAPI.dispatch(LOGOUT());
      messages.success("Password Change Was Successful");
      history("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);
