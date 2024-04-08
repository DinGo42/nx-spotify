import { NotFoundError } from "@shared/utils";

import { Prisma, prisma } from "../prisma";

export const getSelfService = async <T extends Prisma.UserFindUniqueArgs>(
  params: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
) => {
  const user = await prisma.user.findUnique(params);

  if (!user) throw new NotFoundError("Failed to get information. User not found");

  return user;
};

export const updateAccountService = async (update: Prisma.UserUpdateArgs) => {
  const user = await prisma.user.update(update);
  if (!user) throw new NotFoundError(`Failed to get information. User not found`);
};

export const deleteAccountService = async (data: Prisma.UserDeleteArgs) => {
  const user = await prisma.user.delete(data);
  if (!user) throw new NotFoundError(`Failed to get information. User not found`);
  return user;
};
