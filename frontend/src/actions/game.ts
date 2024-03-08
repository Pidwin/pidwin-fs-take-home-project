import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { GameFetchResponse, GameWagerInput } from "shared/interfaces";
import * as api from "../api";
import * as messages from "../messages";
import { FETCH } from "../reducers/game";

/**
 * Fetches the current state of a user's game.
 */
export const fetchGame = createAsyncThunk("game/fetch", async (_, thunkAPI) => {
  try {
    const result: AxiosResponse<GameFetchResponse> = await api.fetchGame();
    thunkAPI.dispatch(FETCH(result.data));
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
      const result: AxiosResponse<GameFetchResponse> = await api.wager(input);
      thunkAPI.dispatch(FETCH(result.data));
      const lastWager =
        result.data.lastTenWagers[result.data.lastTenWagers.length - 1];
      let messageText = `Wager ${lastWager.wagerWon ? "won!" : "lost."}`;
      if (lastWager.bonusAwarded) {
        messageText += " Bonus tokens awarded!";
      }
      messages.info(messageText);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messages.error(error.response?.data.message);
      }
    }
  }
);
