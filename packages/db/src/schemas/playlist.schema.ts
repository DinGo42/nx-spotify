import { z } from "zod";

export const playListSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  cover: z.string().array(),
  authors: z.object({ id: z.string() }).array(),
  listeningHistory: z.object({ id: z.string() }).array(),
  createdAt: z.date(),
});
