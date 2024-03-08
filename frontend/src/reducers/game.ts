import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameFetchResponse } from "shared/interfaces";

type GameState = GameFetchResponse | null;

const initialState: GameState = null as GameState;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    FETCH(state, action: PayloadAction<GameFetchResponse>) {
      const newState = state ? { ...state, ...action.payload } : action.payload;
      return newState;
    },
    CLEAR_GAME() {
      return null;
    },
  },
});
export const { FETCH, CLEAR_GAME } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
