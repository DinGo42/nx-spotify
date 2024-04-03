import { z } from "zod";
import { passwordSchema } from "../user-validation";

export const signUpSchema = z.object({
  email: z.string().email(),
  nickname: z.string(),
  password: passwordSchema,
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
