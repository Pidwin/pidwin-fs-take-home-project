import { GET_TOKENS } from "../constants/actionTypes";

const tokensReducer = (state = 0, action) => {
  switch (action.type) {
    case GET_TOKENS:
      return action.payload;
    default:
      return state;
  }
};
export default tokensReducer;
