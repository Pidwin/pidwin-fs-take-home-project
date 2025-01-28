import { getTopWinningStreaks } from "../../services/gameService.js";

const getKTopLeaderBoard = async (req, res) => {
  try {
    const limit = req.params.limit || 10;

    const topStreaks = await getTopWinningStreaks(limit);

    return res.status(200).json({ topStreaks });
  } catch (error) {
    console.error("Error retrieving top winning streaks:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default getKTopLeaderBoard;
