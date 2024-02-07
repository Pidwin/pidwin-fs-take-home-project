import {
  FETCH_GAME,
  FLIP_COIN_START,
  FLIP_COIN_END,
} from "../constants/actionTypes";

const gameReducer = (
  state = {
    id: null,
    tokens: 0,
    winStreak: 0,
    recentResults: [],
    isFlipping: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_GAME:
      const { _id, tokens, winStreak, recentResults } = action?.currentGame;
      return { ...state, id: _id, tokens, winStreak, recentResults };
    case FLIP_COIN_START:
      return { ...state, isFlipping: true };
    case FLIP_COIN_END:
      return { ...state, isFlipping: false };

    default:
      return state;
  }
};
export default gameReducer;
