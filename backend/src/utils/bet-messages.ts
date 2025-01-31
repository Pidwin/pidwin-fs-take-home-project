import { GameMessage } from "../types/game.interface";

const winnerMessage: GameMessage = {
  type: "GAME_RESULT",
  message: "Congratulations! You won!",
  result: "win",
};

const lossMessage: GameMessage = {
  type: "GAME_RESULT",
  message: "Unfortunately, your guess was wrong.",
  result: "loss",
};

export { lossMessage, winnerMessage };
