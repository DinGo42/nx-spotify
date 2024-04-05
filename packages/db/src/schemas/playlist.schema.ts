import { z } from "zod";

export const playListSchema = z.object({
  authorId: z.string(),
  cover: z.string().array(),
  createdAt: z.date(),
  description: z.string(),
  followers: z.object({ id: z.string() }).array(),
  id: z.string(),
  name: z.string(),
  songs: z.object({ id: z.string() }).array(),
});
