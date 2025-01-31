import { Request, Response } from "express";
import { getUserBetsById } from "../../services/userService";

const getUserBets = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const bets = await getUserBetsById(userId);

    res.status(200).json({ bets });
    return;
  } catch (error) {
    console.error("Error fetching user bets:", error);
    res.status(500).json({ error: (error as Error).message });
    return;
  }
};

export default getUserBets;
