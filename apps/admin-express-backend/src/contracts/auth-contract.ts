import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { UserRoles } from "@bd";
import {
  NotFoundErrorSchema,
  STATUS_CODES,
  UnauthorizedErrorSchema,
} from "@shared";

const c = initContract();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userDTOSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
  createdAt: z.date(),
});

export const authContract = c.router(
  {
    loginUser: {
      method: "POST",
      path: "/login",
      responses: {
        [STATUS_CODES.SUCCESS]: userDTOSchema,
        [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
        [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
      },
      body: LoginSchema,
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
        [STATUS_CODES.SUCCESS]: z.null(),
      },
    },
  },
  {
    pathPrefix: "/auth",
  },
);
