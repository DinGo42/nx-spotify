import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ServerError } from "../../utils";

type TokenServiceProps = {
  accessTokenMaxTime?: number;
  refreshTokenMaxTime?: number;
};

export const accessTokenMaxTime = 1800000;
export const refreshTokenMaxTime = 2592000000;

export const tokenService = <T extends object | string>(tokensMaxTime?: TokenServiceProps) => {
  const generateToken = (payload: T) => {
    if (!process.env.JWT_REFRESH_SECRET_KEY || !process.env.JWT_ACCESS_SECRET_KEY)
      throw new ServerError("Token secret key is missing");
    const refreshToken = jwt.sign(
      {
        payload,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: tokensMaxTime?.refreshTokenMaxTime ?? refreshTokenMaxTime,
      },
    );

    const accessToken = jwt.sign(
      {
        payload,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      {
        expiresIn: tokensMaxTime?.accessTokenMaxTime ?? accessTokenMaxTime,
      },
    );
    return {
      refreshToken,
      accessToken,
    };
  };

  const decodeToken = (token: string | null) => {
    return jwt.decode(token ?? "", {
      complete: true,
      //@ts-expect-error it`s work as i expected value from object or null cos string don`t have any keys
    })?.payload?.payload as T | null;
  };

  const checkTokens = ({ accessToken, refreshToken }: { accessToken: string | null; refreshToken: string | null }) => {
    const accessTokenCheck = decodeToken(accessToken);

    if (accessTokenCheck) return accessTokenCheck;

    const refreshTokenCheck = decodeToken(refreshToken);

    if (!refreshTokenCheck) return null;

    return refreshTokenCheck;
  };
  const refreshTokens = ({
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

  const saveTokens = ({
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

      maxAge: tokensMaxTime?.refreshTokenMaxTime ?? refreshTokenMaxTime,
    });
    res.cookie("accessToken", `Bearer ${accessToken}`, {
      httpOnly: true,
      maxAge: tokensMaxTime?.accessTokenMaxTime ?? accessTokenMaxTime,
    });

    req.cookies.accessToken = `Bearer ${accessToken}`;
    req.cookies.refreshToken = refreshToken;
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
    decodeToken,
    refreshTokens,
    saveTokens,
    deleteTokens,
    checkTokens,
  };
};

export const generateToken = (payload: T) => {
  if (!process.env.JWT_REFRESH_SECRET_KEY || !process.env.JWT_ACCESS_SECRET_KEY)
    throw new ServerError("Token secret key is missing");
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: tokensMaxTime?.refreshTokenMaxTime ?? refreshTokenMaxTime,
    },
  );

  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: tokensMaxTime?.accessTokenMaxTime ?? accessTokenMaxTime,
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

    maxAge: tokensMaxTime?.refreshTokenMaxTime ?? refreshTokenMaxTime,
  });
  res.cookie("accessToken", `Bearer ${accessToken}`, {
    httpOnly: true,
    maxAge: tokensMaxTime?.accessTokenMaxTime ?? accessTokenMaxTime,
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
