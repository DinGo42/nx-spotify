import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

import { authMiddleware } from "../../middlewares";
import { UserContract } from "./types";
import { deleteAccountController, getSelfController, updateAccountController } from "./user-controller";

export const userModule: RecursiveRouterObj<UserContract> = {
  deleteAccount: { handler: deleteAccountController, middleware: [authMiddleware] },
  getSelf: { handler: getSelfController, middleware: [authMiddleware] },
  updateAccount: { handler: updateAccountController, middleware: [authMiddleware] },
};
