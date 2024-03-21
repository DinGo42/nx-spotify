import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES, authMiddleware, userApiContract } from "@shared";
import { userService } from "../services";
import { decodeToken, deleteTokens } from "../main";

const {
  getSelf: getSelfService,
  updateAccount: updateAccountService,
  deleteAccount: deleteAccountService,
} = userService();

export const userController: RecursiveRouterObj<typeof userApiContract.user> = {
  getSelf: {
    handler: async ({ req }) => {
      const { accessToken } = req.cookies;
      const user = await getSelfService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "" });

      return {
        status: STATUS_CODES.SUCCESS,
        body: user,
      };
    },
    middleware: [authMiddleware],
  },
  updateAccount: {
    handler: async ({ req }) => {
      const { accessToken } = req.cookies;
      await updateAccountService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "", ...req.body });

      return {
        status: STATUS_CODES.SUCCESS,
        body: null,
      };
    },
    middleware: [authMiddleware],
  },
  deleteAccount: {
    handler: async ({ req, res }) => {
      const { accessToken } = req.cookies;
      await deleteAccountService({ id: decodeToken(accessToken?.split(" ")[1]) ?? "" });
      deleteTokens(res);
      return {
        status: STATUS_CODES.SUCCESS,
        body: null,
      };
    },
    middleware: [authMiddleware],
  },
};
