import { TOSS_COIN } from "../constants/actionTypes";

const initialState = {
  result: null,
  newTokens: 0,
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOSS_COIN:
      return {
        ...state,
        result: action.payload.result,
        newTokens: action.payload.newTokens,
      };
    default:
      return state;
  }
};
export default coinReducer;
