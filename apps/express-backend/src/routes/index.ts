import { userApiContract } from "@shared/api";
import { initServer } from "@ts-rest/express";

import { authModule, historyModule, playlistModule, songModule, userModule } from "../modules";

const s = initServer();

export const router = s.router(userApiContract, {
  auth: authModule,
  listeningHistory: historyModule,
  playlist: playlistModule,
  song: songModule,
  user: userModule,
});
