import { userApiContract } from "@shared/api";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { loginController, logoutController, signupController } from "./auth-controller";

export const authModule: RecursiveRouterObj<typeof userApiContract.auth> = {
  login: loginController,
  logout: logoutController,
  signup: signupController,
};
