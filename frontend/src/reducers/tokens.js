import { GET_TOKENS, UPDATE_TOKEN_COUNT } from "../constants/actionTypes";

const tokensReducer = (state = 0, action) => {
  switch (action.type) {
    case GET_TOKENS:
      return action.payload;
    case UPDATE_TOKEN_COUNT:
      return action.payload;
    default:
      return state;
  }
};
export default tokensReducer;
