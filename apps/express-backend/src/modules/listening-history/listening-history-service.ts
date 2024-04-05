import { Prisma, prisma } from "../prisma";

export const createListeningHistoryService = async (create: Prisma.ListeningHistoryCreateManyArgs) => {
  return await prisma.listeningHistory.createMany(create);
};

export const getListeningHistoryService = async (get: Prisma.ListeningHistoryFindManyArgs) => {
  return await prisma.listeningHistory.findMany(get);
};
