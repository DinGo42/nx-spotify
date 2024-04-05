import { DefaultArgs } from "@prisma/client/runtime/library";
import { NotFoundError } from "@shared/utils";

import { Prisma, User, prisma } from "../prisma";

type PrismaFindUniqueArgs<T> = {
  [K in keyof Prisma.UserFindUniqueArgs as Exclude<K, "select">]: Prisma.UserFindUniqueArgs[K];
} & {
  select?: Prisma.UserSelect;
};

type A = { where: Partial<Prisma.UserWhereUniqueInput> };

export const getSelfService = async <T extends A>(data: T) => {
  const user = await prisma.user.findUnique<T>({ where: { banned: true } });

  if (!user) throw new NotFoundError(`Failed to get information. User not found`);

  // delete user.password;

  return user;
};

// ({
//   include: {
//     createdPlaylists: {
//       select: {
//         id: true,
//       },
//     },
//     followedPlaylists: {
//       select: {
//         id: true,
//       },
//     },
//   },
//   where: {
//     id: id,
//   },
// }
export const updateAccountService = async (update: Prisma.UserUpdateArgs) => {
  const user = await prisma.user.update(update);
  if (!user) throw new NotFoundError(`Failed to get information. User not found`);
};

export const deleteAccountService = async (data: Prisma.UserDeleteArgs) => {
  const user = await prisma.user.delete(data);
  if (!user) throw new NotFoundError(`Failed to get information. User not found`);
  return user;
};
