import { userSchema } from "@db/schemas";
import { NotFoundError } from "@shared/utils";
import { z } from "zod";
import { prisma } from "../prisma";

export const getSelfService = async ({ id }: { id: string }) => {
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

export const updateAccountService = async ({
  id,
  playlists,
  listeningHistory,
  ...fields
}: Partial<z.infer<typeof userSchema>>) => {
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

export const deleteAccountService = async ({ id }: { id: string }) => {
  const user = await prisma.user.delete({
    where: { id: id },
  });
  if (!user) throw new NotFoundError(`Failed to get information. User not found`);
};
