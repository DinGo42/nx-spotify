import { z } from "zod";

import { MusicTypes } from "../prisma";

export const playListSchema = z.object({
  authorId: z.string(),
  cover: z.string().array(),
  createdAt: z.date(),
  description: z.string(),
  followers: z.number(),
  genres: z.nativeEnum(MusicTypes).array(),
  id: z.string(),
  name: z.string(),
  songs: z.object({ id: z.string() }).array(),
});
