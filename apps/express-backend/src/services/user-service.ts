import { PrismaClient, userSchema } from "@db";
import { NotFoundError } from "@shared";
import { z } from "zod";

const prisma = new PrismaClient();

export const userService = () => {
  const getSelf = async ({ id }: { id: string }) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        playlists: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundError(`Failed to get information. User not found`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDTO } = user;

    return userDTO;
  };

  const updateAccount = async ({ id, playlists, listeningHistory, ...fields }: Partial<z.infer<typeof userSchema>>) => {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        ...fields,
        playlists: {
          connect: playlists?.map((id) => id),
        },
        listeningHistory: {
          connect: listeningHistory?.map((id) => id),
        },
      },
    });
    if (!user) throw new NotFoundError(`Failed to get information. User not found`);
  };

  const deleteAccount = async ({ id }: { id: string }) => {
    const user = await prisma.user.delete({
      where: { id: id },
    });
    if (!user) throw new NotFoundError(`Failed to get information. User not found`);
  };
  return { getSelf, updateAccount, deleteAccount };
};
