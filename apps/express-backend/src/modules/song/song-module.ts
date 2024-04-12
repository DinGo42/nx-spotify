import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { authMiddleware } from "../../middlewares";
import { deleteSongController, getSongController, updateSongController } from "./song-controller";
import { SongContract } from "./types";

export const songModule: RecursiveRouterObj<SongContract> = {
  deleteSong: { handler: deleteSongController, middleware: [authMiddleware] },
  getSong: { handler: getSongController, middleware: [authMiddleware] },
  updateSong: { handler: updateSongController, middleware: [authMiddleware] },
};
