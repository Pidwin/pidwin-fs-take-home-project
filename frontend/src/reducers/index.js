import { combineReducers } from "redux";
import login from "./login";
import cointoss from './cointoss';

export default combineReducers({
  login,
  cointoss,
});
