import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

type TokenServiceProps = {
  accessTokenMaxTime?: number;
  refreshTokenMaxTime?: number;
};

const accessTokenMaxTime = 1800000;
const refreshTokenMaxTime = 2592000000;

export const tokenService = (tokensMaxTime?: TokenServiceProps) => {
  const generateToken = (payload: object | string) => {
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: tokensMaxTime?.refreshTokenMaxTime || refreshTokenMaxTime,
    });

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: tokensMaxTime?.accessTokenMaxTime || accessTokenMaxTime,
    });
    return { refreshToken, accessToken };
  };

  const validateRefreshToken = (token: string | null): JwtPayload | null => {
    if (!token) return null;
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    if (typeof userData === "string") return null;
    return userData;
  };

  const validateAccessToken = (token: string | null) => {
    if (!token) return null;
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    if (typeof userData === "string") return null;
    return userData;
  };

  const refreshTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string | null;
    refreshToken: string | null;
  }) => {
    const accessTokenCheck = validateAccessToken(accessToken);

    if (accessTokenCheck && accessToken && refreshToken)
      return { accessToken, refreshToken };

    const checkResult = validateRefreshToken(refreshToken);

    if (!checkResult) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { aud, exp, iat, iss, jti, nbf, sub, ...userData } = checkResult;

    const newTokens = generateToken(userData);

    return newTokens;
  };

  const saveTokens = ({
    accessToken,
    refreshToken,
    res,
  }: {
    res: Response;
    accessToken: string;
    refreshToken: string;
  }) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: tokensMaxTime?.refreshTokenMaxTime || refreshTokenMaxTime,
    });
    res.cookie("accessToken", `Bearer ${accessToken}`, {
      httpOnly: true,
      maxAge: tokensMaxTime?.accessTokenMaxTime || accessTokenMaxTime,
    });
  };

  const deleteTokens = (res: Response) => {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });

    res.cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
  };
  return {
    generateToken,
    validateRefreshToken,
    validateAccessToken,
    refreshTokens,
    saveTokens,
    deleteTokens,
  };
};
