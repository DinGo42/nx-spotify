import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions";
import { tokenService } from "../services";

const { refreshTokens, saveTokens } = tokenService({});

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken: string = req.cookies.refreshToken;
  const accessToken: string = req.cookies.accessToken.split(" ")[1];

  if (!refreshToken) return next(ApiError.UnauthorizedError(`Session expired`));

  const newTokens = refreshTokens({
    accessToken,
    refreshToken,
  });

  if (!newTokens) return next(ApiError.UnauthorizedError(`Session expired`));

  saveTokens({
    res,
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
  });

  next();
};
