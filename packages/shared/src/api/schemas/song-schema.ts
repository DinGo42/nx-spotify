import { songSchema } from "@db/schemas";

export const updateSongSchema = songSchema
  .omit({
    authors: true,
    createdAt: true,
    link: true,
    listeners: true,
    playlists: true,
  })
  .partial()
  .required({ id: true })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Object must not be empty",
  });
