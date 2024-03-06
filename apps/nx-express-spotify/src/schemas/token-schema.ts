import z from "zod";

export const tokenSchema = z.object({
  user: z.string().uuid(),
  refreshToken: z.string(),
});
