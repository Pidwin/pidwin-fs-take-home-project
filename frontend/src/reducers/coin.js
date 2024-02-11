import { TOSS_COIN } from "../constants/actionTypes";

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
    default:
      return state;
  }
};
export default coinReducer;
