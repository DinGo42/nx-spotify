import { z } from "zod";

export const listeningHistory = z.object({
  createdAt: z.date(),
  id: z.string(),
  songId: z.string(),
  userId: z.string(),
});
