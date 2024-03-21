import { PrismaClient } from "@bd";
import { NotFoundError, UnauthorizedError } from "@shared";
import { checkTokens } from "../main";

const prisma = new PrismaClient();

export const userService = () => {
  const getSelf = async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    const result = checkTokens({ accessToken: accessToken?.split(" ")[1], refreshToken });

    if (!result) throw new UnauthorizedError(`Session expired`);

    const user = await prisma.user.findUnique({
      where: {
        id: result,
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
  return { getSelf };
};
