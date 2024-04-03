import { STATUS_CODES, authMiddleware, tokenService } from "@shared";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { authContract } from "../contracts";
import { authService } from "../services";

const { login: loginService } = authService();
const { deleteTokens, saveTokens } = tokenService();

export const authController: RecursiveRouterObj<typeof authContract> = {
  login: async ({ req, res }) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await loginService({
      email,
      password,
    });

    saveTokens({
      req,
      res,
      refreshToken: refreshToken,
      accessToken: accessToken,
    });

    return {
      status: STATUS_CODES.SUCCESS,
      body: user,
    };
  },
  logout: async ({ res }) => {
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
