import { listeningHistory } from "@db/schemas";

import { UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./type";

export const ListeningHistoryContract = (c: ContractInstance) =>
  c.router(
    {
      getHistory: {
        method: "GET",
        path: "/get-history",
        responses: {
          [STATUS_CODES.SUCCESS]: listeningHistory.array(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
    },
    {
      pathPrefix: "/listening-history",
    },
  );
