import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGameFetchResponse } from "shared/interfaces";

type GameState = IGameFetchResponse | null;

const initialState: GameState = null as GameState;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    FETCH(state, action: PayloadAction<IGameFetchResponse>) {
      const newState = state ? { ...state, ...action.payload } : action.payload;
      return newState;
    },
  },
});
export const { FETCH } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
