import { STATUS_CODES, userApiContract } from "@shared/api";
import { AppRouteOptions } from "@ts-rest/express/src/lib/types";
import { deleteTokens, saveTokens } from "../../main";
import { loginService, signupService } from "./auth-service";

type ContractShapes<T extends keyof typeof userApiContract.auth> = (typeof userApiContract.auth)[T];

type Test<T extends keyof typeof userApiContract.auth> = AppRouteOptions<ContractShapes<T>>["handler"];

export const signupController: AppRouteOptions<ContractShapes<"createUser">>["handler"] = async ({ req, res }) => {
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

export const loginController: AppRouteOptions<ContractShapes<"loginUser">>["handler"] = async ({ req, res }) => {
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

export const logoutController: AppRouteOptions<ContractShapes<"logoutUser">>["handler"] = async ({ res }) => {
  deleteTokens(res);

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};

export const authRouteCheck: AppRouteOptions<ContractShapes<"authRouteCheck">>["handler"] = async () => {
  return {
    status: STATUS_CODES.SUCCESS,
    body: "work",
  };
};
