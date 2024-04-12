import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { getDecodedAccessToken } from "../../utils";
import { addToS3Service, deleteFromS3Service, getLinkFromS3Service } from "../s3";
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

  const avatarUrl = user.avatar && (await getLinkFromS3Service({ key: user.avatar }));

  return {
    body: {
      ...user,
      avatar: avatarUrl,
    },
    status: STATUS_CODES.SUCCESS,
  };
};

export const updateAccountController: ContractRouteHandler<UserContract["updateAccount"]> = async ({ body, req }) => {
  const userId = getDecodedAccessToken(req);
  const { avatar: avatarImage, ...userData } = body;

  // if (listeningHistory) {
  //   await createListeningHistoryService({
  //     data: listeningHistory.map(({ id }) => ({ songId: id, userId })),
  //   });
  // } //// це винести в інше місце в web sokets де на pause play буде вирішуватися чи додавати чи ні в  listeningHistory

  const avatarData = avatarImage ? { avatar: await addToS3Service({ file: avatarImage, userId }) } : {};

  await updateAccountService({
    data: {
      ...userData,
      ...avatarData,
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

  avatar && (await deleteFromS3Service({ key: avatar }));
  deleteTokens(res);
  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};
