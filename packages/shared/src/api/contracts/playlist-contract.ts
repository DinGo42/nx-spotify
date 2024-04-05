import { playListSchema } from "@db/schemas";
import { z } from "zod";

import { UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { createPlaylistSchema, deletePlaylistSchema, updatePlaylistSchema } from "../schemas";
import { ContractInstance } from "./type";

export const PlaylistContract = (c: ContractInstance) =>
  c.router(
    {
      createPlaylist: {
        body: createPlaylistSchema,
        method: "POST",
        path: "/create-playlist",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      deletePlaylist: {
        body: deletePlaylistSchema,
        method: "POST",
        path: "/delete",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getPlaylists: {
        body: playListSchema.pick({
          id: true,
        }),
        method: "POST",
        path: "/get-playlist",
        responses: {
          [STATUS_CODES.SUCCESS]: playListSchema.array(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getPlaylistsPreview: {
        method: "GET",
        path: "/get-playlists-preview",
        responses: {
          [STATUS_CODES.SUCCESS]: playListSchema.omit({ followers: true, songs: true }).array(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      updatePlaylist: {
        body: updatePlaylistSchema,
        method: "POST",
        path: "/update",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
    },
    {
      pathPrefix: "/playlist",
    },
  );
