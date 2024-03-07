import jwt from "jsonwebtoken";

export const tokenService = () => {
  const generateToken = (payload: object | string) => {
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    return { refreshToken, accessToken };
  };

  const validateRefreshToken = (token: string) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };

  const validateAccessToken = (token: string) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };
  return {
    generateToken,
    validateRefreshToken,
    validateAccessToken,
  };
};
