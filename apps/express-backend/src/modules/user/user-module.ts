import { userApiContract } from "@shared/api";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { authMiddleware } from "../../middlewares";
import { deleteAccountController, getSelfController, updateAccountController } from "./user-controller";

export const userModule: RecursiveRouterObj<typeof userApiContract.user> = {
  deleteAccount: { handler: deleteAccountController, middleware: [authMiddleware] },
  getSelf: { handler: getSelfController, middleware: [authMiddleware] },
  updateAccount: { handler: updateAccountController, middleware: [authMiddleware] },
};
