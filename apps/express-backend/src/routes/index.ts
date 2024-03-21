import { initServer } from "@ts-rest/express";
import { authController, userController } from "../controllers";
import { userApiContract } from "@shared";

const s = initServer();

export const router = s.router(userApiContract, {
  auth: authController,
  user: userController,
});
