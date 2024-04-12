import { Prisma, prisma } from "../prisma";

export const createListeningHistoryService = async <T extends Prisma.ListeningHistoryCreateManyArgs>(
  create: Prisma.SelectSubset<T, Prisma.ListeningHistoryCreateManyArgs>,
) => {
  return await prisma.listeningHistory.createMany(create);
};

export const getListeningHistoryService = async <T extends Prisma.ListeningHistoryFindManyArgs>(
  get: Prisma.SelectSubset<T, Prisma.ListeningHistoryFindManyArgs>,
) => {
  return await prisma.listeningHistory.findMany(get);
};
