import { Prisma } from "@db/prisma";

import { prisma } from "../prisma";

export const createPlaylistService = async <T extends Prisma.PlaylistCreateArgs>(
  create: Prisma.SelectSubset<T, Prisma.PlaylistCreateArgs>,
) => {
  return await prisma.playlist.create(create);
};

export const getPlaylistsService = async <T extends Prisma.PlaylistFindManyArgs>(
  get: Prisma.SelectSubset<T, Prisma.PlaylistFindManyArgs>,
) => {
  return await prisma.playlist.findMany(get);
};
export const updatePlaylistService = async <T extends Prisma.PlaylistUpdateArgs>(
  data: Prisma.SelectSubset<T, Prisma.PlaylistUpdateArgs>,
) => {
  return await prisma.playlist.update(data);
};
export const deletePlaylistService = async <T extends Prisma.PlaylistDeleteArgs>(
  data: Prisma.SelectSubset<T, Prisma.PlaylistDeleteArgs>,
) => {
  return await prisma.playlist.delete(data);
};

export const updateManyPlaylistsService = async <T extends Prisma.PlaylistUpdateManyArgs>(
  data: Prisma.SelectSubset<T, Prisma.PlaylistUpdateManyArgs>,
) => {
  return await prisma.playlist.updateMany(data);
};
