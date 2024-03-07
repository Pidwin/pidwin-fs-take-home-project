import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
