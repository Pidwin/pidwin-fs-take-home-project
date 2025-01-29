const initialState = {
  tokenBalance: 0,
};

const tokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalance: action.data,
      };
    default:
      return state;
  }
};

export default tokensReducer;
