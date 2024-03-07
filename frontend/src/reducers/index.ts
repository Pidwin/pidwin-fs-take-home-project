import { combineReducers } from "@reduxjs/toolkit";
import { gameReducer } from "./game";
import { loginReducer } from "./login";

export const rootReducer = combineReducers({
  game: gameReducer,
  login: loginReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
