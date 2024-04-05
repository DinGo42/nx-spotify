import { z } from "zod";

export enum PasswordErrorMessages {
  LETTER_CHECK = "no_letter_in_password",
  SPECIAL_CHAR_CHECK = "no_special_char_in_password",
  TO_SHORT = "to_short",
}

export const passwordSchema = z
  .string()
  .regex(/\d|[#!?&]/, PasswordErrorMessages.SPECIAL_CHAR_CHECK)
  .regex(/[a-zA-Z]/, PasswordErrorMessages.LETTER_CHECK)
  .min(10, PasswordErrorMessages.TO_SHORT);
