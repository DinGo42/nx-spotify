import { userSchema } from "@db/schemas";
import { z } from "zod";

export const updateAccountSchema = userSchema
  .omit({
    avatar: true,
    banned: true,
    createdAt: true,
    createdPlaylists: true,
    id: true,
  })
  .partial()
  .and(z.object({ avatar: z.instanceof(File) }))
  .optional();
