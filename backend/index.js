import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./src/api/user.js";
import esMain from 'es-main';
import { get } from 'lodash-es';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: process.env.ENCODING_LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: process.env.ENCODING_LIMIT, extended: true }));

app.use(cors());
app.use("/api/user", userRouter);

const PORT = get(process, 'env.PORT', 5000);

/* c8 ignore start */
if (esMain(import.meta)) {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error.message);
  }
}
/* c8 ignore stop */

const server = await app.listen(PORT);

console.log(`Server Started On Port ${PORT}`);

export default server;
