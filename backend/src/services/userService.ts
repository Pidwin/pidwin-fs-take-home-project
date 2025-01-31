import Bet from "../models/bet";
import User from "../models/user";
import { IBet } from "../types/bet.interace";
import { IGame } from "../types/game.interface";
import { IUser } from "../types/user.interface";

const getUserBetsById = async (userId: string): Promise<IBet[]> => {
  try {
    const bets: any = await Bet.find({
      userId,
    })
      .populate<{ gameId: IGame }>("gameId", "rollValues isLucky")
      .sort({ createdAt: -1 });

    return bets;
  } catch (error) {
    console.error("Error fetching user bets:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error."
    );
  }
};

const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const user = (await User.findById(userId)) as IUser | null;
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user streaks:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error."
    );
  }
};

export { getUserBetsById, getUserById };
