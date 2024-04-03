import { ServerError } from "@shared/utils";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenMaxTime = process.env.JWT_ACCESS_TOKEN_MAX_TIME;
const refreshTokenMaxTime = process.env.JWT_REFRESH_TOKEN_MAX_TIME;

export const generateToken = (payload: string) => {
  if (!process.env.JWT_REFRESH_SECRET_KEY || !process.env.JWT_ACCESS_SECRET_KEY)
    throw new ServerError("Token secret key is missing");
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: refreshTokenMaxTime,
    },
  );

  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: accessTokenMaxTime,
    },
  );
  return {
    refreshToken,
    accessToken,
  };
};

export const decodeToken = (token: string | null) => {
  return jwt.decode(token ?? "", {
    complete: true,
    //@ts-expect-error it`s work as i expected value from object or null cos string don`t have any keys
  })?.payload?.payload as T | null;
};

export const checkTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}) => {
  const accessTokenCheck = decodeToken(accessToken);

  if (accessTokenCheck) return accessTokenCheck;

  const refreshTokenCheck = decodeToken(refreshToken);

  if (!refreshTokenCheck) return null;

  return refreshTokenCheck;
};

export const refreshTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}) => {
  const checkResult = checkTokens({
    accessToken,
    refreshToken,
  });

  if (!checkResult) return null;

  const newTokens = generateToken(checkResult);

  return newTokens;
};

export const saveTokens = ({
  accessToken,
  refreshToken,
  res,
  req,
}: {
  res: Response;
  req: Request;
  accessToken: string;
  refreshToken: string;
}) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: refreshTokenMaxTime,
  });
  res.cookie("accessToken", `Bearer ${accessToken}`, {
    httpOnly: true,
    maxAge: accessTokenMaxTime,
  });

  req.cookies.accessToken = `Bearer ${accessToken}`;
  req.cookies.refreshToken = refreshToken;
};

export const deleteTokens = (res: Response) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.cookie("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
  });
};
