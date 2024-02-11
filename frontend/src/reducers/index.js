import { combineReducers } from "redux";
import login from "./login";
import tokens from "./tokens";
import coin from "./coin";

export default combineReducers({
  login,
  tokens,
  coin,
});
