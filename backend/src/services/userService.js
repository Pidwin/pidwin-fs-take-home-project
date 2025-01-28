import Bet from "../models/bet.js";
import User from "../models/user.js";

// Later Addition: Limit/Offset
const getUserBetsById = async (userId) => {
  try {
    // Get Game Details
    // Sort by most recent bets
    const bets = await Bet.find({ userId })
      .populate("gameId", "rollValues isLucky")
      .sort({ createdAt: -1 });

    return bets;
  } catch (error) {
    console.error("Error fetching user bets:", error);
    throw new Error(error.message || "Internal server error.");
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user streaks:", error);
    throw new Error(error.message || "Internal server error.");
  }
};

export { getUserBetsById, getUserById };
