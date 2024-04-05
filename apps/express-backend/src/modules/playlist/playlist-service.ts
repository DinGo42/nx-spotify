import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma } from "@db/prisma";

import { prisma } from "../prisma";

export const createPlaylistService = async (create: Prisma.PlaylistCreateArgs<DefaultArgs>) => {
  return await prisma.playlist.create(create);
};

export const getPlaylistService = async (get: Prisma.PlaylistFindManyArgs<DefaultArgs>) => {
  return await prisma.playlist.findMany(get);
};
export const updatePlaylistService = async (data: Prisma.PlaylistUpdateArgs<DefaultArgs>) => {
  return await prisma.playlist.update(data);
};
export const deletePlaylistService = async (data: Prisma.PlaylistDeleteArgs<DefaultArgs>) => {
  return await prisma.playlist.delete(data);
};

export const updateManyPlaylistsService = async (data: Prisma.PlaylistUpdateManyArgs<DefaultArgs>) => {
  return await prisma.playlist.updateMany(data);
};
