import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/api/user/user";
import gameRouter from "./src/api/game/game";

dotenv.config();

export const app: Application = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);

const DEBUG: boolean = process.env.DEBUG_MODE === "true";

if (DEBUG) {
  app.use(express.static("public"));
}
