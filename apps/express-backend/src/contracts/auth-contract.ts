import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  ForbiddenErrorSchema,
  NotFoundErrorSchema,
  STATUS_CODES,
  UnauthorizedErrorSchema,
} from "../exceptions";
import { UserRoles } from "@prisma/client";

const c = initContract();

const UserSchema = z.object({
  email: z.string().email(),
  userName: z.string(),
  password: z.string(),
});

const LoginSchema = UserSchema.omit({
  userName: true,
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
    createUser: {
      method: "POST",
      path: "/signup",
      responses: {
        [STATUS_CODES.CREATED]: UserSchema.omit({
          password: true,
        }),
        [STATUS_CODES.FORBIDDEN]: ForbiddenErrorSchema,
      },

      body: UserSchema,
    },
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
