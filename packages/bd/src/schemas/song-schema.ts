import { z } from "zod";

export const songSchema = z.object({
  id: z.string(),
  name: z.string(),
  authors: z.object({ id: z.string() }).array(),
  listeners: z.object({ id: z.string() }).array(),
  playlists: z.object({ id: z.string() }).array(),
  albums: z.object({ id: z.string() }).array(),
  cover: z.string().array(),
  link: z.string(),
  createdAt: z.date(),
});
