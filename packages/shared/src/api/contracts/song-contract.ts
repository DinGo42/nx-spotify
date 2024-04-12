import { songSchema } from "@db/schemas";
import { z } from "zod";

import { NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { updateSongSchema } from "../schemas";
import { ContractInstance } from "./type";

export const songContract = (c: ContractInstance) =>
  c.router(
    {
      deleteSong: {
        body: songSchema.pick({ id: true }),
        method: "DELETE",
        path: "/delete",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getSong: {
        body: songSchema.pick({ id: true }),
        method: "POST",
        path: "/get-song",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: songSchema.omit({
            albums: true,
            playlists: true,
          }),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      updateSong: {
        body: updateSongSchema,
        method: "PATCH",
        path: "/update",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
    },
    {
      pathPrefix: "/song",
    },
  );
