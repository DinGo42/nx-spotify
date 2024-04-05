import { ContractRouteHandler, STATUS_CODES } from "@shared/api";

import { getDecodedAccessToken } from "../../utils";
import { getListeningHistoryService } from "./listening-history-service";
import { ListeningHistoryContract } from "./types";

export const getListeningHistoryController: ContractRouteHandler<ListeningHistoryContract["getHistory"]> = async ({
  req,
}) => {
  const userId = getDecodedAccessToken(req);
  const user = await getListeningHistoryService({
    where: {
      userId,
    },
  });

  return {
    body: user,
    status: STATUS_CODES.SUCCESS,
  };
};
