import { z } from "zod";

export const userSchema = z.object({
  avatar: z.string().nullish(),
  banned: z.boolean(),
  createdAt: z.date(),
  createdPlaylists: z.object({ id: z.string() }).array(),
  email: z.string().email(),
  followedPlaylists: z.object({ id: z.string() }).array(),
  id: z.string(),
  listeningHistory: z.object({ id: z.string() }).array(),
  nickname: z.string(),
  password: z.string(),
});
