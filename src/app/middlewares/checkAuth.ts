import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";

export const checkAuth = () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies?.accessToken;
      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }
      const verifiedToken = verifyToken(
        accessToken,
        config.jwt.secret
      ) as JwtPayload;
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
