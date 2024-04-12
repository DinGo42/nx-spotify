import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { authMiddleware } from "../../middlewares";
import {
  createPlaylistController,
  deletePlaylistsController,
  followPlayListController,
  getPlaylist,
  getUserCreatedPlaylists,
  getUserPlaylistRecommendation,
  updatePlaylistsController,
} from "./playlist-controller";
import { PlaylistContract } from "./types";

export const playlistModule: RecursiveRouterObj<PlaylistContract> = {
  createPlaylist: { handler: createPlaylistController, middleware: [authMiddleware] },
  deletePlaylist: { handler: deletePlaylistsController, middleware: [authMiddleware] },
  followPlaylist: { handler: followPlayListController, middleware: [authMiddleware] },
  getPlaylist: { handler: getPlaylist, middleware: [authMiddleware] },
  getUserCreatedPlaylists: { handler: getUserCreatedPlaylists, middleware: [authMiddleware] },
  getUserPlaylistRecommendation: { handler: getUserPlaylistRecommendation, middleware: [authMiddleware] },
  updatePlaylist: { handler: updatePlaylistsController, middleware: [authMiddleware] },
};
