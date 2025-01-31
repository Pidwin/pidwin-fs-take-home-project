import { Request, Response } from "express";
import { getTopWinningStreaks } from "../../services/gameService";

const getKTopLeaderBoard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit: number = parseInt(req.params.limit, 10) || 10;

    const topStreaks = await getTopWinningStreaks(limit);

    res.status(200).json({ topStreaks });
    return;
  } catch (error) {
    console.error("Error retrieving top winning streaks:", error);
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

export default getKTopLeaderBoard;
