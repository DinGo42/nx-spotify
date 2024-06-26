import { UnauthorizedError } from "@shared/utils";
import { AppRoute, AppRouter } from "@ts-rest/core";
import { TsRestRequest } from "@ts-rest/express";
import { NextFunction, Response } from "express";
import { refreshTokens, saveTokens } from "../modules";

export const authMiddleware = <T extends AppRouter | AppRoute>(
  req: TsRestRequest<T>,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken && req.cookies.accessToken.split(" ")[1];

  if (!refreshToken && !accessToken) return next(new UnauthorizedError(`Session expired`));

  const newTokens = refreshTokens({
    accessToken,
    refreshToken,
  });

  if (!newTokens) return next(new UnauthorizedError(`Session expired`));

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;

  saveTokens({
    res,
    req,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });

  next();
};
