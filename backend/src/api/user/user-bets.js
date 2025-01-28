import { getUserBetsById } from "../../services/userService.js";

const getUserBets = async (req, res) => {
  const userId = req.userId;

  try {
    const bets = await getUserBetsById(userId);

    return res.status(200).json({ bets });
  } catch (error) {
    console.error("Error fetching user bets:", error);
    return res.status(500).json({ error: error.message });
  }
};

export default getUserBets;
