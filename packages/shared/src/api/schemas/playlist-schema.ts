import { playListSchema } from "@db/schemas";

export const updatePlaylistSchema = playListSchema.partial();
export const deletePlaylistSchema = playListSchema.pick({ id: true });
export const createPlaylistSchema = playListSchema.omit({ author: true, createdAt: true, id: true });
