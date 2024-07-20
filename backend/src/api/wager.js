import prand from 'pure-rand';
import { forEach, map } from 'lodash-es';

import User from '../models/user.js';

const wager = async (req, res) => {
  try {
    const wager = BigInt(req.body.wager);

    if (wager < process.env.MIN_WAGER) {
      return res.status(400).json({ message: `minimum wager is ${process.env.MIN_WAGER}` });
    }

    let user = await User.findOne({ _id: req.userId }, 'tokens history');

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    if (wager > user.tokens) {
      return res.status(400).json({ message: `maximum wager is ${user.tokens}` });
    }

    // @NOTE Subtract wager
    user.tokens = user.tokens - wager;
    user = await User.findByIdAndUpdate(req.userId, { ...user }, { new: true });

    const seed = Date.now() ^ (Math.random() * 0x100000000);
    const rng = prand.unsafeUniformIntDistribution(1, 2, prand.xoroshiro128plus(seed));

    const answer = rng === 1 ? 'heads' : 'tails';
    const guess = req.body.guess;
    const winner = guess === answer;
    let payout = 0n;
    let rate = 2n;

    if (!winner || user.consecutive >= process.env.MAX_CONSECUTIVE_WINS) {
      user.consecutive = 0;
    }

    if (winner) {
      user.consecutive++;

      switch (user.consecutive) {
        case 3:
          rate = 3n;
          break;

        case 5:
          rate = 10n;
          break;
      }

      // @NOTE Add payout
      payout = wager * rate;
      user.tokens = user.tokens + payout;
      user = await User.findByIdAndUpdate(req.userId, { ...user }, { new: true });
    }

    let history = {
      answer,
      consecutive: user.consecutive,
      guess,
      payout,
      rate,
      tokens: user.tokens,
      wager,
      winner,
    };
    user.history = (user?.history && user?.history instanceof Array) || [];
    user.history.push(history);
    while (user.history.length > process.env.MAX_HISTORY) {
      user.history.shift();
    }
    user = await User.findByIdAndUpdate(req.userId, { ...user }, { new: true });

    const transform = (history) => forEach(history, (value, key, object) => {
      switch(key) {
        case 'payout':
        case 'tokens':
        case 'rate':
        case 'wager':
          return object[key] = value.toString();

        case '_id':
          return delete object[key];
      }
    });

    history = transform(history);
    history.history = map(user.history.toObject(), transform);

    res.status(200).json(history);
  } catch (error) {
    console.log({error})
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default wager;
