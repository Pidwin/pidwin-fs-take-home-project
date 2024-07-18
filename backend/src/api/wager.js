import prand from 'pure-rand';

import User from '../models/user.js';

const wager = async (req, res) => {
  const guess = req.body.guess;
  const wager = BigInt(req.body.wager);

  if (wager < process.env.MIN_WAGER) {
    return res.status(400).json({ message: `minimum wager is ${process.env.MIN_WAGER}` });
  }

  const existingUser = await User.findOne({ _id: req.userId });
  if (!existingUser) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  let tokens = existingUser.tokens;

  if (wager > tokens) {
    return res.status(400).json({ message: `maximum wager is ${tokens}` });
  }

  const subtractWager = await User.findByIdAndUpdate(
    req.userId,
    { tokens: tokens - wager },
    { new: true }
  );

  tokens = subtractWager.tokens;

  const seed = Date.now() ^ (Math.random() * 0x100000000);
  const rng = prand.unsafeUniformIntDistribution(1, 2, prand.xoroshiro128plus(seed));

  const answer = rng === 1 ? 'heads' : 'tails';
  const winner = guess === answer;
  let payout = 0n;

  if (winner) {
    const rate = 2n;
    payout = wager * rate;

    const addPayout = await User.findByIdAndUpdate(
      req.userId,
      { tokens: tokens + payout },
      { new: true }
    );

    tokens = addPayout.tokens;
  }

  res.status(200).json({
    answer,
    payout: payout.toString(),
    tokens: tokens.toString(),
    wager: wager.toString(),
    winner,
  });
};

export default wager;
