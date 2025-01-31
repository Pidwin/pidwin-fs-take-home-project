import { scheduleGames, stopActiveGames } from "../../services/gameService";
import { Request, Response, NextFunction } from "express";

export const startGameScheduling = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    scheduleGames();
    res.status(200).json({ message: "Game scheduling started successfully." });
  } catch (error) {
    console.error("Error starting game scheduling:", error);
    res.status(500).json({ message: "Failed to start game scheduling." });
  }
};

export const stopGameScheduling = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    stopActiveGames();
    res.status(200).json({ message: "Game scheduling stopped successfully." });
  } catch (error) {
    console.error("Error starting game scheduling:", error);
    res.status(500).json({ message: "Failed to start game scheduling." });
  }
};
