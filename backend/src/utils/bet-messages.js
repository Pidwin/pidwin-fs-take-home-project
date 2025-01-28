const winnerMessage = {
  type: "GAME_RESULT",
  message: "Congratulations! You won!",
  result: "win",
};

const lossMessage = {
  type: "GAME_RESULT",
  message: "Unfortunately, your guess was wrong.",
  result: "loss",
};

export { lossMessage, winnerMessage };
