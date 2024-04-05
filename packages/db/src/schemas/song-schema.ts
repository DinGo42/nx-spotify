import { z } from "zod";

export const songSchema = z.object({
  albums: z.object({ id: z.string() }).array(),
  authors: z.object({ id: z.string() }).array(),
  cover: z.string().array(),
  createdAt: z.date(),
  id: z.string(),
  link: z.string(),
  listeners: z.object({ id: z.string() }).array(),
  name: z.string(),
  playlists: z.object({ id: z.string() }).array(),
});
