import { NotFoundError } from "@shared/utils";
import { prisma } from "../prisma";

export const createAdmin = async ({ email }: { email: string }) => {
  const user = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError(`User with email:${email} not found`);

  // await prisma.admin.update({
  //   where: {
  //     email,
  //   },
  // });
  return null;
};

export const blockUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError(`User with email:${email} not found`);
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      banned: true,
    },
  });
  return null;
};
export const unblockUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError(`User with email:${email} not found`);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      banned: false,
    },
  });

  return null;
};
