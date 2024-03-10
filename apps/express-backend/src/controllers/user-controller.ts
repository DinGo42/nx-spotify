import { Request, Response, NextFunction } from "express";
import { tokenService, userService } from "../services";
import { STATUS_CODES } from "../exceptions";

const { login: loginService, signup: signupService } = userService();
const { deleteTokens, saveTokens } = tokenService();

export const userController = () => {
  const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, userName } = req.body;
      const { accessToken, refreshToken, user } = await signupService({
        email,
        password,
        userName,
      });

      saveTokens({
        res,
        refreshToken,
        accessToken,
      });

      if (user) res.status(STATUS_CODES.SUCCESS).json({ message: "Logined" });
    } catch (error) {
      next(error);
    }
  };

  const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await loginService({
        email,
        password,
      });

      saveTokens({
        res,
        refreshToken: result.refreshToken,
        accessToken: result.refreshToken,
      });

      if (result) res.status(STATUS_CODES.SUCCESS).json({ message: "Logined" });
    } catch (error) {
      next(error);
    }
  };

  const logout = (req: Request, res: Response) => {
    deleteTokens(res);

    res.status(STATUS_CODES.SUCCESS).json({ message: "Successfully logout" });
  };
  return { login, signup, logout };
};
