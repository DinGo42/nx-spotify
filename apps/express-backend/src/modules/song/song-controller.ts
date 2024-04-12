import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { getDecodedAccessToken } from "../../utils";
import { deleteFromS3Service } from "../s3";
import { deleteSongService, getSongService, updateSongService } from "./song-service";
import { SongContract } from "./types";

export const getSongController: ContractRouteHandler<SongContract["getSong"]> = async ({ body: { id } }) => {
  const song = await getSongService({
    include: {
      authors: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
    where: {
      id,
    },
  });

  return {
    body: song,
    status: STATUS_CODES.SUCCESS,
  };
};

export const updateSongController: ContractRouteHandler<SongContract["updateSong"]> = async ({ body, req }) => {
  const userId = getDecodedAccessToken(req);

  const { albums, id, ...songData } = body;

  const albumData = albums
    ? {
        albums: {
          connect: albums?.map(({ id }) => ({ id })),
        },
      }
    : {};

  await updateSongService({
    data: {
      ...songData,
      ...albumData,
    },
    where: {
      authors: {
        some: {
          id: userId,
        },
      },
      id,
    },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const deleteSongController: ContractRouteHandler<SongContract["deleteSong"]> = async ({ body, req }) => {
  const userId = getDecodedAccessToken(req);

  const { link } = await deleteSongService({
    where: {
      authors: {
        some: {
          id: userId,
        },
      },
      id: body.id,
    },
  });

  await deleteFromS3Service({ key: link });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};
