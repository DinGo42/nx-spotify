import { RouteHandler, STATUS_CODES } from "@shared/api";
import { deleteTokens, saveTokens } from "../token";
import { loginService, signupService } from "./auth-service";
import { AuthContract } from "./types";

export const signupController: RouteHandler<AuthContract["signup"]> = async ({ req, res }) => {
  const { email, password, nickname } = req.body;
  const { accessToken, refreshToken } = await signupService({
    email,
    password,
    nickname,
  });

  saveTokens({
    req,
    res,
    refreshToken: refreshToken,
    accessToken: accessToken,
  });

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};

export const loginController: RouteHandler<AuthContract["login"]> = async ({ req, res }) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginService({
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
    body: null,
  };
};

export const logoutController: RouteHandler<AuthContract["logout"]> = async ({ res }) => {
  deleteTokens(res);

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};

export const authRouteCheck: RouteHandler<AuthContract["authRouteCheck"]> = async () => {
  return {
    status: STATUS_CODES.SUCCESS,
    body: "work",
  };
};
