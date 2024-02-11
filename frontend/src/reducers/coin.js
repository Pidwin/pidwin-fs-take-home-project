import { TOSS_COIN, CLEAR_TOSS_HISTORY } from "../constants/actionTypes";

const initialState = {
  history: [],
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOSS_COIN:
      return {
        ...state,
        history: [...action.data],
      };
    case CLEAR_TOSS_HISTORY:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};
export default coinReducer;
