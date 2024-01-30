import User from "../models/user.js";

const tossCoin = async (req, res) => {
  const random = (Math.random() < 0.5);
  let result = random ? 'Heads' : 'Tails';

  try {
    const user = await User.findById(req.body.userId);

    if(!user) {
      return res.status(404).json({ message: "User not found"});
    }

    if(user.tokens < req.body.wager) {
      return res.status(400).json({message: "Not enough tokens"});
    }

    user.tokens -= req.body.wager;

    if(result === req.body.choice) {
      user.tokens += req.body.wager * 2;
      await user.save();

      return res.status(200).json({ message: "won", tokens: user.tokens });
    }

    await user.save();
    return res.status(200).json({ message: "lost", tokens: user.tokens });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong"});
  }
}

export default tossCoin;
