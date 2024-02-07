import Game from "../models/game.js";

const flipCoin = async (req, res) => {
  const { email, guess, wager } = req.body;

  try {
    const currentGame = await Game.findOne({ email });

    const flipResult = Math.round(Math.random()); // HEADS = 0, TAILS = 1
    const isWin = guess === flipResult;
    const updatedWinStreak = getWinStreak(isWin, currentGame.winStreak);
    const wagerMultiplier = getWagerMultiplier(updatedWinStreak);
    const bonus = getBonusString(wagerMultiplier);
    const winnings = isWin ? wager * wagerMultiplier : -wager;
    const updatedTokens = currentGame.tokens + winnings;
    const recentResults = getRecentResults(
      flipResult,
      currentGame.recentResults
    );

    currentGame.tokens = updatedTokens;
    currentGame.winStreak = updatedWinStreak;
    currentGame.recentResults = recentResults;
    currentGame.save();

    res.status(200).json({ currentGame, flipResult, winnings, bonus });
  } catch (error) {
    res.status(500).json({ message: "Error flipping coin" });
  }
};

const getWinStreak = (isWin, currentWins) => {
  if (!isWin) {
    return 0;
  }
  if (currentWins === 5) {
    return 1;
  }
  return currentWins + 1;
};

const getWagerMultiplier = (winStreak) => {
  switch (winStreak) {
    case 3:
      return 3;
    case 5:
      return 10;
    default:
      return 1;
  }
};

const getBonusString = (multiplier) => {
  switch (multiplier) {
    case 3:
      return "3x";
    case 5:
      return "10x";
    default:
      return;
  }
};

const getRecentResults = (newResult, results) => {
  let updated = results.slice();
  updated.push(newResult);

  while (updated.length > 10) {
    updated.shift();
  }
  return updated;
};

export default flipCoin;
