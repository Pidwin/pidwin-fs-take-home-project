import { WAGERHISTORY, WAGERSTATUS, TOKENAMOUNT, SETFLIP, TOPTENPLAYER } from "../constants/actionTypes";

const initialState = {
    wagerHistory: [],
    wagerStatus: "heads",
    tokenAmount: 0,
    flip: false,
    topTenPlayer: [],
}

const wagerReducer = (state = initialState, action) => {

    switch (action.type) {
        case WAGERHISTORY:
            return { ...state, wagerHistory: action?.data };
        case WAGERSTATUS:
            return { ...state, wagerStatus: action?.data };
        case TOKENAMOUNT:
            return { ...state, tokenAmount: action?.data };
        case SETFLIP:
            return { ...state, flip: action?.data };
        case TOPTENPLAYER:
            return { ...state, topTenPlayer: action?.data };
        default:
            return state;
    }
}
export default wagerReducer;