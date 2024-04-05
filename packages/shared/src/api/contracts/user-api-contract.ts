import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";
import { ListeningHistoryContract } from "./listening-history-contract";
import { PlaylistContract } from "./playlist-contract";
import { userContract } from "./user-contract";

export * from "./type";

const c = initContract();

export const userApiContract = c.router(
  {
    auth: authContract(c),
    listeningHistory: ListeningHistoryContract(c),
    playlist: PlaylistContract(c),
    user: userContract(c),
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  },
);
