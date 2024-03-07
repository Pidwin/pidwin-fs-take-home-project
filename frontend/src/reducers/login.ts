import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "shared/interfaces";

interface ILoginState {
  token: string | null;
}

const initialState: ILoginState = { token: null };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LOGIN(state, action: PayloadAction<LoginResponse>) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state = { ...state, ...action.payload };
    },
    LOGOUT(state) {
      localStorage.clear();
      state = { ...state, token: null };
    },
  },
});
export const { LOGIN, LOGOUT } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
