import z from "zod";
import validator from "validator";

export const userSchema = z.object({
  userName: z.string(),
  password: z.string().min(4),
  email: z.string().email().refine(validator.isEmail),
});
