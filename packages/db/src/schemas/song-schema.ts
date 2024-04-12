import { z } from "zod";

import { MusicTypes } from "../prisma";

export const songSchema = z.object({
  albums: z.object({ id: z.string() }).array(),
  authors: z.object({ id: z.string(), nickname: z.string() }).array(),
  cover: z.string(),
  createdAt: z.date(),
  genres: z.nativeEnum(MusicTypes).array(),
  id: z.string(),
  link: z.string(),
  listeners: z.number(),
  name: z.string(),
  playlists: z.object({ id: z.string() }).array(),
});
