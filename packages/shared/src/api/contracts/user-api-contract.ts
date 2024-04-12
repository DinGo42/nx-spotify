import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";
import { ListeningHistoryContract } from "./listening-history-contract";
import { PlaylistContract } from "./playlist-contract";
import { songContract } from "./song-contract";
import { userContract } from "./user-contract";

export * from "./type";

const c = initContract();

export const userApiContract = c.router(
  {
    auth: authContract(c),
    listeningHistory: ListeningHistoryContract(c),
    playlist: PlaylistContract(c),
    song: songContract(c),
    user: userContract(c),
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  },
);
