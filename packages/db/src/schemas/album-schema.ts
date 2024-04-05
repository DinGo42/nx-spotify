import { z } from "zod";

export const albumSchema = z.object({
  authors: z.object({ id: z.string() }).array(),
  cover: z.string().array(),
  createdAt: z.date(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  songs: z.object({ id: z.string() }).array(),
});
