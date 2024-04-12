import { z } from "zod";

import { MusicTypes } from "../prisma";

export const albumSchema = z.object({
  authors: z.object({ id: z.string() }).array(),
  cover: z.string().array(),
  createdAt: z.date(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  songs: z.object({ id: z.string() }).array(),
  type: z.nativeEnum(MusicTypes),
});
