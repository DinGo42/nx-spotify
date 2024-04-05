import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { authMiddleware } from "../../middlewares";
import {
  createPlaylistController,
  deletePlaylistsController,
  getPlaylistsController,
  updatePlaylistsController,
} from "./playlist-controller";
import { PlaylistContract } from "./types";

export const playlistModule: RecursiveRouterObj<PlaylistContract> = {
  createPlaylist: { handler: createPlaylistController, middleware: [authMiddleware] },
  deletePlaylist: { handler: deletePlaylistsController, middleware: [authMiddleware] },
  getPlaylists: { handler: getPlaylistsController, middleware: [authMiddleware] },
  updatePlaylist: { handler: updatePlaylistsController, middleware: [authMiddleware] },
};
