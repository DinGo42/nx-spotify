import { z } from "zod";
import { STATUS_CODES, loginSchema, signUpSchema } from "../constants";
import { ForbiddenErrorSchema, NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { ContractInstance } from "./type";

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      createUser: {
        method: "POST",
        path: "/signup",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.FORBIDDEN]: ForbiddenErrorSchema,
        },
        body: signUpSchema,
      },
      loginUser: {
        method: "POST",
        path: "/login",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
        body: loginSchema,
      },
      logoutUser: {
        method: "GET",
        path: `/logout`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
      authRouteCheck: {
        method: "GET",
        path: `/users`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.string(),
        },
      },
    },
    {
      pathPrefix: "/auth",
    },
  );
