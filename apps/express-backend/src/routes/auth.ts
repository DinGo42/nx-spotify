import { authContract } from "../contracts";
import { initServer } from "@ts-rest/express";
import { authController } from "../controllers";

const s = initServer();

export const authRouter = s.router(authContract, authController);
