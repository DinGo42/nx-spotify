import { addToS3, deleteFromS3, getLinkFromS3 } from "@db/s3";
import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { createCryptoKey, getDecodedAccessToken } from "../../utils";
import { createListeningHistoryService } from "../listening-history";
import { Prisma } from "../prisma";
import { deleteTokens } from "../token";
import { UserContract } from "./types";
import { deleteAccountService, getSelfService, updateAccountService } from "./user-service";

export const getSelfController: ContractRouteHandler<UserContract["getSelf"]> = async ({ req }) => {
  const id = getDecodedAccessToken(req);
  const user = await getSelfService({
    include: {
      createdPlaylists: {
        select: {
          id: true,
        },
      },
      followedPlaylists: {
        select: {
          id: true,
        },
      },
    },

    where: {
      id: id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const avatarUrl = user.avatar && (await getLinkFromS3({ Key: user.avatar }));

  return {
    body: {
      ...user,
      avatar: avatarUrl ?? "",
    },
    status: STATUS_CODES.SUCCESS,
  };
};

export const updateAccountController: ContractRouteHandler<UserContract["updateAccount"]> = async ({ req }) => {
  const userId = getDecodedAccessToken(req);
  const { avatar, followedPlaylists, listeningHistory, ...userData } = req.body;

  listeningHistory &&
    (await createListeningHistoryService({
      data: listeningHistory.map(({ id }) => ({ songId: id, userId })),
    }));

  const cryptoKey = avatar && createCryptoKey();

  if (avatar) {
    const avatarBuffer = Buffer.from(await avatar.arrayBuffer());
    // eslint-disable-next-line @typescript-eslint/naming-convention
    await addToS3({ Body: avatarBuffer, ContentType: avatar.type, Key: cryptoKey });
  }

  const avatarData: Prisma.UserUpdateArgs["data"] = avatar ? { avatar: cryptoKey } : {};
  const followedPlaylistsData: Prisma.UserUpdateArgs["data"] = followedPlaylists
    ? {
        followedPlaylists: {
          connect: followedPlaylists.map(({ id }) => ({ id })),
        },
      }
    : {};

  await updateAccountService({
    data: {
      ...userData,
      ...avatarData,
      ...followedPlaylistsData,
    },
    where: { id: userId },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const deleteAccountController: ContractRouteHandler<UserContract["deleteAccount"]> = async ({ req, res }) => {
  const id = getDecodedAccessToken(req);

  const { avatar } = await deleteAccountService({
    where: {
      id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  avatar && (await deleteFromS3({ Key: avatar }));
  deleteTokens(res);
  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};
