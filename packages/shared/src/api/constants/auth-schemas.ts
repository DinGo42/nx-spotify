import { z } from "zod";

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

export const signUpSchema = z.object({
  email: z.string().email(),
  nickname: z.string(),
  password: passwordSchema,
});

export const tokensSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
