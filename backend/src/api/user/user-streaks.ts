import { Request, Response } from "express";
import { getUserById } from "../../services/userService";

const getUserStreakInformation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      name: user.name,
      currentWinningStreak: user.currentWinningStreak,
      highestStreak: user.highestStreak,
    });
    return;
  } catch (error) {
    console.error("Error fetching user streaks:", error);
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

export default getUserStreakInformation;
