import { authService } from "../services";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES, authMiddleware, tokenService } from "@shared";
import { authContract } from "../contracts";

const { login: loginService } = authService();
const { deleteTokens, saveTokens } = tokenService();

export const authController: RecursiveRouterObj<typeof authContract> = {
  loginUser: async ({ req, res }) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await loginService({
      email,
      password,
    });

    saveTokens({
      res,
      refreshToken: refreshToken,
      accessToken: accessToken,
    });

    return {
      status: STATUS_CODES.SUCCESS,
      body: user,
    };
  },
  logoutUser: async ({ res }) => {
    deleteTokens(res);

    return {
      status: STATUS_CODES.SUCCESS,
      body: null,
    };
  },
  authRouteCheck: {
    middleware: [authMiddleware],
    handler: async ({ res }) => {
      deleteTokens(res);

      return {
        status: STATUS_CODES.SUCCESS,
        body: null,
      };
    },
  },
};
