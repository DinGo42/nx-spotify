import { STATUS_CODES } from "@shared/api";
import { AppRoute } from "@ts-rest/core";
import { AppRouteOptions } from "@ts-rest/express";
import { decodeToken, deleteTokens } from "../token";
import { UserContract } from "./types";
import { deleteAccountService, getSelfService, updateAccountService } from "./user-service";

type Router<TRoute extends AppRoute> = AppRouteOptions<TRoute>;
type RouteHandler<TRoute extends AppRoute> = Router<TRoute>["handler"];

export const getSelfController: RouteHandler<UserContract["getSelf"]> = async ({ req }) => {
  const { accessToken } = req.cookies;
  const user = await getSelfService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "" });

  return {
    status: STATUS_CODES.SUCCESS,
    body: user,
  };
};
export const updateAccountController: RouteHandler<UserContract["updateAccount"]> = async ({ req }) => {
  const { accessToken } = req.cookies;
  await updateAccountService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "", ...req.body });

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};

export const deleteAccountController: RouteHandler<UserContract["deleteAccount"]> = async ({ req, res }) => {
  const { accessToken } = req.cookies;
  await deleteAccountService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "" });
  deleteTokens(res);
  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};
