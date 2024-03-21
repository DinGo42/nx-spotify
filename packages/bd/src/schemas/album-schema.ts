import { z } from "zod";

export const albumSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  cover: z.string().array(),
  songs: z.object({ id: z.string() }).array(),
  authors: z.object({ id: z.string() }).array(),
  createdAt: z.date(),
});
