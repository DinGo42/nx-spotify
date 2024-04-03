import { userApiContract } from "@shared/api";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";

export const userModule: RecursiveRouterObj<typeof userApiContract.user> = {
  deleteAccount: deleteAccountController,
  getSelf: getSelfController,
  updateAccount: updateAccountController,
};
