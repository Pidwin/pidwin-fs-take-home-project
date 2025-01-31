import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export interface DecodedToken extends JwtPayload {
  _id?: string;
  sub?: string;
}
