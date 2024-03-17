import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { UserRoles } from "@bd";
import { STATUS_CODES } from "../constants";
import { ForbiddenErrorSchema, NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";

const c = initContract();

export const passwordLengthCheck = (password: string) => z.string().min(10).safeParse(password).success;

export const passwordHasLetterCheck = (password: string) =>
  z
    .string()
    .regex(/[a-zA-Z]/)
    .safeParse(password).success;

export const passwordHasDigitOrSpecialCharCheck = (password: string) =>
  z
    .string()
    .regex(/\d|[#!?&]/)
    .safeParse(password).success;

export enum PasswordErrorMessages {
  TO_SHORT = "to_short",
  LETTER_CHECK = "no_letter_in_password",
  SPECIAL_CHAR_CHECK = "no_special_char_in_password",
}
const passwordSchema = z
  .string()
  .regex(/\d|[#!?&]/, PasswordErrorMessages.SPECIAL_CHAR_CHECK)
  .regex(/[a-zA-Z]/, PasswordErrorMessages.LETTER_CHECK)
  .min(10, PasswordErrorMessages.TO_SHORT);

export const userSchema = z.object({
  email: z.string().email(),
  userName: z.string(),
  password: passwordSchema,
});

export const tokensSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const loginSchema = userSchema.omit({
  userName: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;

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
        [STATUS_CODES.SUCCESS]: userSchema.omit({
          password: true,
        }),
        [STATUS_CODES.FORBIDDEN]: ForbiddenErrorSchema,
      },
      body: userSchema,
    },
    loginUser: {
      method: "POST",
      path: "/login",
      responses: {
        [STATUS_CODES.SUCCESS]: userDTOSchema,
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
    strictStatusCodes: true,
    pathPrefix: "/auth",
  },
);
