import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./src/api/user.js";
import lucky7Router from "./src/api/lucky7.js";
import { lucky7Game } from "./src/api/lucky7Game.js";

import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/lucky7", lucky7Router);

const PORT = process.env.PORT || 5000;

console.log("print mongo url")
console.log(process.env.MONGODB_URL)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));


  // run a game of lucky7 every 15 seconds.
  setIntervalAsync(async ()=> {
    await lucky7Game()
  }, 15000)
