import { authMiddleware, userApiContract } from "@shared/api";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { authRouteCheck, loginController, logoutController, signupController } from "./auth-controller";

export const authModule: RecursiveRouterObj<typeof userApiContract.auth> = {
  logoutUser: logoutController,
  createUser: signupController,
  loginUser: loginController,
  authRouteCheck: {
    handler: authRouteCheck,
    middleware: [authMiddleware],
  },
};
