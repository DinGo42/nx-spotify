import { PrismaClient } from "@prisma/client";

export { Prisma } from "@prisma/client";
export type { ListeningHistory, Playlist, User } from "@prisma/client";

export const prisma = new PrismaClient();
