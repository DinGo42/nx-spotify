import { Router } from "express";
import { userController } from "../controllers";
import { STATUS_CODES } from "../exceptions";
import { authMiddleware } from "../middlewares";

const { login, logout, signup } = userController();
export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/users", authMiddleware, (req, res) => {
  res.status(STATUS_CODES.SUCCESS).json({ message: "Success u authorized" });
});
