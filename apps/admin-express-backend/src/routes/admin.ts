import { initServer } from "@ts-rest/express";
import { adminController } from "../controllers";
import { adminContract } from "../contracts";

const s = initServer();

export const adminRouter = s.router(adminContract, adminController);
