import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import gameRouter from "./src/api/game/game";
import userRouter from "./src/api/user/user";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);

const PORT = process.env.PORT || 5000;

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error("Please define MONGODB_URL within the server's .env file.");
}

mongoose
  .connect(mongoUrl)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
