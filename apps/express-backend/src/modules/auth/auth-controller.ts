import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { deleteTokens, saveTokens } from "../token";
import { loginService, signupService } from "./auth-service";
import { AuthContract } from "./types";

export const signupController: ContractRouteHandler<AuthContract["signup"]> = async ({ req, res }) => {
  const { email, nickname, password } = req.body;
  const { accessToken, refreshToken } = await signupService({
    email,
    nickname,
    password,
  });

  saveTokens({
    accessToken: accessToken,
    refreshToken: refreshToken,
    req,
    res,
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const loginController: ContractRouteHandler<AuthContract["login"]> = async ({ req, res }) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginService({
    email,
    password,
  });

  saveTokens({
    accessToken: accessToken,
    refreshToken: refreshToken,
    req,
    res,
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const logoutController: ContractRouteHandler<AuthContract["logout"]> = async ({ res }) => {
  deleteTokens(res);

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};
