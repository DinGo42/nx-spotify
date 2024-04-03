import { STATUS_CODES } from "@shared/api";
import { AppRouteOptions } from "@ts-rest/express";

import { AppRoute } from "@ts-rest/core";

type Router<TRoute extends AppRoute> = AppRouteOptions<TRoute>;
type RouteHandler<TRoute extends AppRoute> = Router<TRoute>["handler"];

export const createAdminController = async ({ req }) => {
  const { email } = req.body;

  await createAdminService({
    email,
  });

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};
export const blockUser = async ({
  req: {
    body: { email },
  },
}) => {
  blockUserService({ email });

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};

export const unblockUser = async ({
  req: {
    body: { email },
  },
}) => {
  unblockUserService({ email });

  return {
    status: STATUS_CODES.SUCCESS,
    body: null,
  };
};
