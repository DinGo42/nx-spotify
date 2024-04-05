import { PrismaClient } from "@prisma/client";

export { ListeningHistory, Playlist, Prisma, User } from "@prisma/client";

export const prisma = new PrismaClient();
