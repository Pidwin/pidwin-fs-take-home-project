import Game from "../models/game.js";

const fetchGame = async (req, res) => {
  const { email } = req.body;

  try {
    const currentGame = await Game.findOne({ email });
    res.status(200).json({ currentGame });
  } catch (error) {
    res.status(500).json({ message: "Error fetching game" });
  }
};

export default fetchGame;
