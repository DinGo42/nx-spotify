import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { authMiddleware } from "../../middlewares";
import { getListeningHistoryController } from "./listening-history-controller";
import { ListeningHistoryContract } from "./types";

export const historyModule: RecursiveRouterObj<ListeningHistoryContract> = {
  getHistory: { handler: getListeningHistoryController, middleware: [authMiddleware] },
};
