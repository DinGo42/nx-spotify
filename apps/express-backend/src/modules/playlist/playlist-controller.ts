import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { getDecodedAccessToken } from "../../utils";
import { Prisma } from "../prisma";
import { updateAccountService } from "../user";
import {
  createPlaylistService,
  deletePlaylistService,
  getPlaylistService,
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

export const getPlaylistsPreviewController: ContractRouteHandler<PlaylistContract["getPlaylistsPreview"]> = async ({
  req,
}) => {
  const id = getDecodedAccessToken(req);

  const playlists = await getPlaylistService({
    where: {
      author: { id },
    },
  });

  return {
    body: playlists,
    status: STATUS_CODES.SUCCESS,
  };
};

export const getPlaylistController: ContractRouteHandler<PlaylistContract["getPlaylists"]> = async ({ req }) => {
  const playlist = await getPlaylistService({
    include: {
      followers: {
        select: {
          id: true,
        },
      },
      songs: {
        select: {
          cover: true,
          id: true,
        },
      },
    },
    where: {
      id: req.body.id,
    },
  });

  return {
    body: playlist,
    status: STATUS_CODES.SUCCESS,
  };
};

export const updatePlaylistsController: ContractRouteHandler<PlaylistContract["updatePlaylist"]> = async ({ req }) => {
  const { cover, description, id, name, songs } = req.body;
  const userId = getDecodedAccessToken(req);

  const songsData: Prisma.PlaylistUpdateArgs["data"] = songs
    ? { songs: { connect: songs.map(({ id }) => ({ id })) } }
    : {};

  await updatePlaylistService({
    data: {
      cover,
      description,
      name,
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
