import express from "express";
import mongoose from "mongoose";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/api/user/user.js";
import gameRouter from "./src/api/game/game.js";
import {
  broadcastMessage,
  setupWebSocketServer,
} from "./src/websockets/websocket-server.js";
import {
  createGame,
  determineWinners,
  generateLuckySeven,
  updateWinningStreaks,
} from "./src/services/gameService.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupWebSocketServer(server);

app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);
const PORT = process.env.PORT || 5000;
const DEBUG = process.env.DEBUG_MODE || "false";

if (DEBUG === "true") {
  app.use(express.static("public"));
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    server.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const scheduleGames = () => {
  setInterval(async () => {
    const gameId = await createGame();

    // Broadcast Game Information to Frontend
    broadcastMessage({
      type: "NEW_GAME",
      id: gameId,
    });

    // Roll dice and update result after 15 seconds
    setTimeout(async () => {
      // Does the roll
      await generateLuckySeven(gameId);

      // Determine winners and update bets
      await determineWinners(gameId);

      // Update winning streaks of users that won
      // or reset for losses that occured
      await updateWinningStreaks(gameId);
    }, 15000);
  }, 15000);
};

scheduleGames();
