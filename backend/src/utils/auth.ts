import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, DecodedToken } from "../types/auth.interface";

const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token is required for authentication" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token is required for authentication" });
    return;
  }

  const isCustomAuth = token.length < 500;
  let decodedData: DecodedToken | null = null;

  try {
    if (isCustomAuth) {
      decodedData = verifyToken(token);
      if (!decodedData?._id) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
      }
      req.userId = decodedData._id;
    } else {
      decodedData = jwt.decode(token) as DecodedToken;
      if (!decodedData?.sub) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
      }
      req.userId = decodedData.sub;
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }

  next();
};

const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, "test") as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("Decoding Token failed:", err);
    return null;
  }
};

export { auth, verifyToken };
