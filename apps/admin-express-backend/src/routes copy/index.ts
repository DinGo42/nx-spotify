import { userApiContract } from "@shared/api";
import { initServer } from "@ts-rest/express";
import { authModule, userModule } from "../modules";

const s = initServer();

export const router = s.router(userApiContract, {
  auth: authModule,
  user: userModule,
});
