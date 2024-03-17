import { authService } from "../services";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES, authContract, authMiddleware, tokenService } from "@shared";

const { login: loginService, signup: signupService } = authService();
const { deleteTokens, saveTokens } = tokenService();

export const authController: RecursiveRouterObj<typeof authContract> = {
  createUser: async ({ req, res }) => {
    const { email, password, userName } = req.body;

    const { accessToken, refreshToken, user } = await signupService({
      email,
      password,
      userName,
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
  loginUser: async ({ req, res }) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, ...user } = await loginService({
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
    handler: async () => {
      return {
        status: STATUS_CODES.SUCCESS,
        body: "work",
      };
    },
  },
};
