import { getUserById } from "../../services/userService.js";

const getUserStreakInformation = async (req, res) => {
  try {
    const user = await getUserById(req.userId);

    return res.status(200).json({
      name: user.name,
      currentWinningStreak: user.currentWinningStreak,
      highestStreak: user.highestStreak,
    });
  } catch (error) {
    console.error("Error fetching user streaks:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default getUserStreakInformation;
