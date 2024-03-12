import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../utils";
import { tokenService } from "../services";

const { refreshTokens, saveTokens } = tokenService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken =
    req.cookies.accessToken && req.cookies.accessToken.split(" ")[1];

  if (!refreshToken) return next(new UnauthorizedError(`Session expired`));

  const newTokens = refreshTokens({
    accessToken,
    refreshToken,
  });

  if (!newTokens) return next(new UnauthorizedError(`Session expired`));

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    newTokens;

  saveTokens({
    res,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });

  next();
};
