import { z } from "zod";

import { passwordSchema } from "../user-validation";

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
