import { ILoginResponse } from "@pidwin/shared";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  token: string | null;
}

const initialState: LoginState = { token: null };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LOGIN(state, action: PayloadAction<ILoginResponse>) {
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
