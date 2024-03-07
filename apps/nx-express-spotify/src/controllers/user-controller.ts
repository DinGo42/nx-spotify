import { Request, Response } from "express";
import { userService } from "../services";
import { STATUS_CODES } from "../exceptions";

const { login: loginService, signup: signupService } = userService();

export const userController = () => {
  const signup = async (req: Request, res: Response, next) => {
    try {
      const { email, password, userName } = req.body;
      const { accessToken, refreshToken, user } = await signupService({
        email,
        password,
        userName,
      });
      console.log("refreshToken");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 900000,
      });
      if (user) res.status(STATUS_CODES.SUCCESS).json({ message: "Logined" });
    } catch (error) {
      next(error);
    }
  };

  const login = async (req: Request, res: Response, next) => {
    try {
      const { email, password } = req.body;

      const result = await loginService({
        email,
        password,
      });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: 90000,
      });
      if (result) res.status(STATUS_CODES.SUCCESS).json({ message: "Logined" });
    } catch (error) {
      next(error);
    }
  };

  const logout = (req: Request, res: Response) => {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(STATUS_CODES.SUCCESS).json({ message: "Successfully logout" });
  };
  return { login, signup, logout };
};
