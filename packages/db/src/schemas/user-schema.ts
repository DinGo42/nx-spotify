import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  email: z.string().email(),
  banned: z.boolean(),
  password: z.string(),
  playlists: z.object({ id: z.string() }).array(),
  listeningHistory: z.object({ id: z.string() }).array(),
  createdAt: z.date(),
});
