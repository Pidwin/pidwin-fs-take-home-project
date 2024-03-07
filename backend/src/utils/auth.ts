import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token && token.length < 500;

    if (token) {
      let decodedData = isCustomAuth
        ? jwt.verify(token, "test")
        : jwt.decode(token);

      if (typeof decodedData === "object") {
        req.params.userId = isCustomAuth ? decodedData?._id : decodedData?.sub;
      }
    }

    next();
  } catch (error) {}
};

export default auth;
