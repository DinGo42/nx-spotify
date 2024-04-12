import { userSchema } from "@db/schemas";
import { z } from "zod";

export const updateAccountSchema = userSchema
  .omit({
    avatar: true,
    banned: true,
    createdAt: true,
    createdPlaylists: true,
    followedPlaylists: true,
    id: true,
    listeningHistory: true,
  })
  .partial()
  .merge(
    z.object({
      avatar: z.instanceof(File),
    }),
  )
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Object must not be empty",
  });
