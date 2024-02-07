import {
  FETCH_GAME,
  FLIP_COIN_END,
  FLIP_COIN_START,
} from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const fetchGame = (email) => async (dispatch) => {
  const req = { email };
  try {
    const {
      data: { currentGame },
    } = await api.fetchGame(req);
    dispatch({ type: FETCH_GAME, currentGame });
  } catch (error) {
    messages.error("Error Fetching Game");
    console.error(error);
  }
};

export const flipCoin = (formData) => async (dispatch) => {
  const req = formData;
  try {
    dispatch({ type: FLIP_COIN_START });

    await api.flipCoin(req).then((res) => {
      const {
        data: { currentGame, winnings, flipResult, bonus },
      } = res;

      // Do short timeout to allow for coin flip animation
      setTimeout(() => {
        dispatch({ type: FETCH_GAME, currentGame });
        if (formData.guess === flipResult) {
          messages.success(winStringBuilder(winnings, bonus));
        } else {
          messages.warning(
            `You guessed wrong :( You lost ${Math.abs(winnings)} tokens.`
          );
        }
        dispatch({ type: FLIP_COIN_END });
      }, 1000);
    });
  } catch (error) {
    messages.error("Error Flipping Coin");
    console.error(error);
  }
};

const winStringBuilder = (winnings, bonus) => {
  const strBase = `You guessed correctly! You won ${winnings} tokens!`;
  const strBonus = bonus ? ` You got a ${bonus} win streak bonus too!!!` : "";
  return strBase + strBonus;
};
