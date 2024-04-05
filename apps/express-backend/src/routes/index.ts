import { userApiContract } from "@shared/api";
import { initServer } from "@ts-rest/express";

import { authModule, historyModule, userModule } from "../modules";
import { playlistModule } from "../modules/playlist";

const s = initServer();

export const router = s.router(userApiContract, {
  auth: authModule,
  listeningHistory: historyModule,
  playlist: playlistModule,
  user: userModule,
});
