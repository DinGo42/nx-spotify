import { NotFoundError } from "@shared/utils";

import { Prisma, prisma } from "../prisma";

export const getSongService = async <T extends Prisma.SongFindUniqueArgs>(
  params: Prisma.SelectSubset<T, Prisma.SongFindUniqueArgs>,
) => {
  const song = await prisma.song.findUnique(params);

  if (!song) throw new NotFoundError("Failed to get information. Song not found");

  return song;
};

export const updateSongService = async <T extends Prisma.SongUpdateArgs>(
  update: Prisma.SelectSubset<T, Prisma.SongUpdateArgs>,
) => {
  const song = await prisma.song.update(update);
  if (!song) throw new NotFoundError(`Failed to get information. Song not found`);
};

export const deleteSongService = async <T extends Prisma.SongDeleteArgs>(
  data: Prisma.SelectSubset<T, Prisma.SongDeleteArgs>,
) => {
  const song = await prisma.song.delete(data);
  if (!song) throw new NotFoundError(`Failed to get information. Song not found`);
  return song;
};
