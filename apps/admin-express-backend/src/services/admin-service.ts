import { NotFoundError } from "@shared/api";
const prisma = new PrismaClient();

export const adminService = () => {
  const createAdmin = async ({ email }: { email: string }) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundError(`User with email:${email} not found`);

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        role: "ADMIN",
      },
    });
    return null;
  };

  const blockUser = async ({ email }: { email: string }) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOT: {
          role: "ADMIN",
        },
      },
    });

    if (!user) throw new NotFoundError(`User with email:${email} not found`);
    await prisma.users.update({
      where: {
        email,
      },
      data: {
        banned: true,
      },
    });
    return null;
  };
  const unblockUser = async ({ email }: { email: string }) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOT: {
          role: "ADMIN",
        },
      },
    });

    if (!user) throw new NotFoundError(`User with email:${email} not found`);

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        banned: false,
      },
    });

    return null;
  };

  return { createAdmin, unblockUser, blockUser };
};
