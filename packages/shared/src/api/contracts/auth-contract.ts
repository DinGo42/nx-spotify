import { z } from "zod";

import { ForbiddenErrorSchema, NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { loginSchema, signUpSchema } from "../schemas";
import { ContractInstance } from "./type";

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      login: {
        body: loginSchema,
        method: "POST",
        path: "/login",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      logout: {
        method: "GET",
        path: `/logout`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
      signup: {
        body: signUpSchema,
        method: "POST",
        path: "/signup",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
    },
    {
      pathPrefix: "/auth",
    },
  );
