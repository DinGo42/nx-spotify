import { playListSchema } from "@db/schemas";

export const updatePlaylistSchema = playListSchema.omit({ authorId: true, followers: true, genres: true }).partial();
export const createPlaylistSchema = playListSchema.omit({ author: true, createdAt: true, id: true });
