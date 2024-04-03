import { z } from "zod";

export enum PasswordErrorMessages {
  TO_SHORT = "to_short",
  LETTER_CHECK = "no_letter_in_password",
  SPECIAL_CHAR_CHECK = "no_special_char_in_password",
}

export const passwordSchema = z
  .string()
  .regex(/\d|[#!?&]/, PasswordErrorMessages.SPECIAL_CHAR_CHECK)
  .regex(/[a-zA-Z]/, PasswordErrorMessages.LETTER_CHECK)
  .min(10, PasswordErrorMessages.TO_SHORT);
