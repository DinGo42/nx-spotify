import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions";
import { tokenService } from "../services";

const { validateRefreshToken } = tokenService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.refreshToken;

  if (!token) return next(ApiError.UnauthorizedError());

  if (!validateRefreshToken(token)) next(ApiError.UnauthorizedError());
  next();
};
