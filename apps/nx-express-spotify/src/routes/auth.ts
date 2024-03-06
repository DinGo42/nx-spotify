import { Router } from "express";
import { userController } from "../controllers";

const { login, logout, refresh, signup } = userController();
export const authRouter = Router();

authRouter.post("./login", login);
authRouter.post("./logout", logout);
authRouter.post("./signup", refresh);
authRouter.get("./refresh", signup);
