import { authService } from "../services";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES, authMiddleware, userApiContract } from "@shared";
import { saveTokens, deleteTokens } from "../main";

const { login: loginService, signup: signupService } = authService();

export const authController: RecursiveRouterObj<typeof userApiContract.auth> = {
  createUser: async ({ req, res }) => {
    const { email, password, nickname } = req.body;
    const { accessToken, refreshToken } = await signupService({
      email,
      password,
      nickname,
    });

    saveTokens({
      res,
      refreshToken: refreshToken,
      accessToken: accessToken,
    });

    return {
      status: STATUS_CODES.SUCCESS,
      body: null,
    };
  },
  loginUser: async ({ req, res }) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginService({
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
      body: null,
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
    handler: async () => {
      return {
        status: STATUS_CODES.SUCCESS,
        body: "work",
      };
    },
  },
};
