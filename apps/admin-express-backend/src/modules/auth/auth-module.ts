import { userApiContract } from "@shared/api";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { authMiddleware } from "../../middlewares";
import { authRouteCheck, loginController, logoutController, signupController } from "./auth-controller";

export const authModule: RecursiveRouterObj<typeof userApiContract.auth> = {
  logout: logoutController,
  signup: signupController,
  login: loginController,
  authRouteCheck: {
    handler: authRouteCheck,
    middleware: [authMiddleware],
  },
};
