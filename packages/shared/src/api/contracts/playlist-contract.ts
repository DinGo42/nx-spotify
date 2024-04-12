import { playListSchema } from "@db/schemas";
import { z } from "zod";

import { UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { createPlaylistSchema, updatePlaylistSchema } from "../schemas";
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
        body: playListSchema.pick({ id: true }),
        method: "DELETE",
        path: "/delete",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      followPlaylist: {
        body: playListSchema.pick({ id: true }),
        method: "POST",
        path: "/follow-playlist",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getPlaylist: {
        body: playListSchema.pick({
          id: true,
        }),
        method: "POST",
        path: "/get-playlist",
        responses: {
          [STATUS_CODES.SUCCESS]: playListSchema,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getUserCreatedPlaylists: {
        method: "GET",
        path: "/get-user-playlists",
        responses: {
          [STATUS_CODES.SUCCESS]: playListSchema.omit({ followers: true, songs: true }).array(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getUserPlaylistRecommendation: {
        method: "GET",
        path: "/get-user-recommendation",
        responses: {
          [STATUS_CODES.SUCCESS]: playListSchema.omit({ followers: true, songs: true }).array(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      updatePlaylist: {
        body: updatePlaylistSchema,
        method: "PATCH",
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
