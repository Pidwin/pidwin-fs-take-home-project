import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GameWagerInput } from "shared/interfaces";
import * as api from "../api";
import * as messages from "../messages";
import { FETCH } from "../reducers/game";

/**
 * Fetches the current state of a user's game.
 */
export const fetchGame = createAsyncThunk("game/fetch", async (_, thunkAPI) => {
  try {
    const { data } = await api.fetchGame();
    thunkAPI.dispatch(FETCH(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      messages.error(error.response?.data.message);
    }
  }
});

/**
 * Makes a wager on a round of the coin-toss game.
 */
export const wager = createAsyncThunk(
  "game/wager",
  async (input: GameWagerInput, thunkAPI) => {
    try {
      const { data } = await api.wager(input);
      thunkAPI.dispatch(FETCH(data));
      const messageText = `Wager ${data.wagerWon ? "won!" : "lost."}`;
      messages.info(messageText);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);
