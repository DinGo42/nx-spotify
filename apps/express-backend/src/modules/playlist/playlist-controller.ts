import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { getDecodedAccessToken } from "../../utils";
import { getListeningHistoryService } from "../listening-history";
import { Prisma } from "../prisma";
import { updateAccountService } from "../user";
import {
  createPlaylistService,
  deletePlaylistService,
  getPlaylistsService,
  updatePlaylistService,
} from "./playlist-service";
import { PlaylistContract } from "./types";

export const createPlaylistController: ContractRouteHandler<PlaylistContract["createPlaylist"]> = async ({ req }) => {
  const { cover, description, name, songs } = req.body;
  const userId = getDecodedAccessToken(req);

  const playlist = await createPlaylistService({
    data: {
      author: { connect: { id: userId } },
      cover,
      description,
      name,
      songs: {
        connect: songs.map(({ id }) => ({ id })),
      },
    },
  });

  await updateAccountService({
    data: {
      createdPlaylists: {
        connect: { id: playlist.id },
      },
    },
    where: {
      id: userId,
    },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const getPlaylist: ContractRouteHandler<PlaylistContract["getPlaylist"]> = async ({ body: { id } }) => {
  const playlist = await getPlaylistsService({
    include: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _count: {
        select: {
          followers: true,
        },
      },
      songs: {
        select: {
          authors: {
            select: {
              id: true,
              nickname: true,
            },
          },
          cover: true,
          createdAt: true,
          id: true,
          link: true,
          listeners: true,
          name: true,
        },
      },
    },
    where: {
      id,
    },
  });
  const {
    _count: { followers },
    ...playlistData
  } = playlist[0];
  return {
    body: { ...playlistData, followers },
    status: STATUS_CODES.SUCCESS,
  };
};

export const getUserCreatedPlaylists: ContractRouteHandler<PlaylistContract["getUserCreatedPlaylists"]> = async ({
  req,
}) => {
  const id = getDecodedAccessToken(req);

  const playlists = await getPlaylistsService({
    where: {
      author: { id },
    },
  });

  return {
    body: playlists,
    status: STATUS_CODES.SUCCESS,
  };
};

export const getUserPlaylistRecommendation: ContractRouteHandler<
  PlaylistContract["getUserPlaylistRecommendation"]
> = async ({ req }) => {
  const id = getDecodedAccessToken(req);

  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const monthlyUserSongs = await getListeningHistoryService({
    select: {
      songId: true,
    },
    where: {
      createdAt: {
        gte: new Date(),
        lte: oneMonthFromNow,
      },
      id,
    },
  });

  const playlists = await getPlaylistsService({
    where: {
      author: { id },
      songs: {
        some: {
          id: {
            in: monthlyUserSongs.map(({ songId }) => songId),
          },
        },
      },
    },
  });

  return {
    body: playlists,
    status: STATUS_CODES.SUCCESS,
  };
};

export const updatePlaylistsController: ContractRouteHandler<PlaylistContract["updatePlaylist"]> = async ({ req }) => {
  const { id, songs, ...playListData } = req.body;
  const userId = getDecodedAccessToken(req);

  const songsData: Prisma.PlaylistUpdateArgs["data"] = songs
    ? { songs: { connect: songs.map(({ id }) => ({ id })) } }
    : {};

  await updatePlaylistService({
    data: {
      ...playListData,
      ...songsData,
    },
    where: {
      author: { id: userId },
      id,
    },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const followPlayListController: ContractRouteHandler<PlaylistContract["followPlaylist"]> = async ({ req }) => {
  const { id } = req.body;
  const userId = getDecodedAccessToken(req);

  await updatePlaylistService({
    data: {
      followers: { connect: { id: userId } },
    },
    where: {
      id,
    },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};

export const deletePlaylistsController: ContractRouteHandler<PlaylistContract["deletePlaylist"]> = async ({ req }) => {
  const { id } = req.body;
  const userId = getDecodedAccessToken(req);
  await deletePlaylistService({
    where: {
      author: { id: userId },
      id,
    },
  });

  return {
    body: null,
    status: STATUS_CODES.SUCCESS,
  };
};
