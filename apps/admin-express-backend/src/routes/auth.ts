import { initServer } from "@ts-rest/express";
import { authController } from "../controllers";
import { authContract } from "@shared";

const s = initServer();

export const authRouter = s.router(authContract, authController);
