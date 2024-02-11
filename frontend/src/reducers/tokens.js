import { UPDATE_TOKEN_COUNT } from "../constants/actionTypes";

const tokensReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_TOKEN_COUNT:
      return action.data;
    default:
      return state;
  }
};
export default tokensReducer;
