import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import esMain from 'es-main';
import { get } from 'lodash-es';
import * as OpenApiValidator from 'express-openapi-validator';
import esmResolver from './src/utils/esm-resolver.js';
import auth from "./src/utils/auth.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: process.env.ENCODING_LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: process.env.ENCODING_LIMIT, extended: true }));

app.use(cors());

const apiSpec = `${import.meta.dirname}/build/spec/api.yaml`;
app.use('/spec', express.static(apiSpec));
app.use(OpenApiValidator.middleware({
  apiSpec,
  operationHandlers: esmResolver(`${import.meta.dirname}/src`),
  validateRequests: true,
  validateResponses: true,
  validateSecurity: { handlers: { BearerAuth: auth } }
}));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

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
