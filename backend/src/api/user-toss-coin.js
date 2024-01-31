import User from "../models/user.js";

const tossCoin = async (req, res) => {
  const random = (Math.random() < 0.5);
  let result = random ? 'Heads' : 'Tails';
  let didWin = false;
  let message = "lost";
  let bonusMultipler = 1;

  try {
    const user = await User.findById(req.body.userId);

    if(!user) {
      return res.status(404).json({ message: "User not found"});
    }

    const { wager, choice } = req.body;

    if(user.tokens < wager) {
      return res.status(400).json({message: "Not enough tokens"});
    }

    user.tokens -= wager;

    if(result === choice) {
      didWin = true;
      user.consecutiveWins += 1;

      if(user.consecutiveWins === 3) {
        message = 'won with 3x bonus';
        bonusMultipler = 3;
      } else if(user.consecutiveWins >= 5) {
        message = 'won with 10x bonus';
        bonusMultipler = 10;
        // reset streak after 5 wins
        user.consecutiveWins = 0;
      } else {
        message = 'won';
      }

      user.tokens += wager * bonusMultipler * 2;
    } else {
      user.consecutiveWins = 0;
    }

    const newToss = {
      win: didWin,
      amount: wager * bonusMultipler,
    }

    user.tossHistory = [newToss, ...user.tossHistory].slice(0, 10);
    await user.save();
    return res.status(200).json({ message, tokens: user.tokens, tossHistory: user.tossHistory });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong"});
  }
}

export default tossCoin;
