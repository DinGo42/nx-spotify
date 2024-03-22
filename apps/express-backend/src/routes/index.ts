import { userApiContract } from "@shared/api";
import { initServer } from "@ts-rest/express";
import { userController } from "../controllers";
import { authModule } from "../modules";

const s = initServer();

export const router = s.router(userApiContract, {
  auth: authModule,
  user: userController,
});
