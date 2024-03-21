import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES, userApiContract } from "@shared";
import { userService } from "../services";

const { getSelf: getSelfService } = userService();

export const userController: RecursiveRouterObj<typeof userApiContract.user> = {
  getSelf: async ({ req }) => {
    const { refreshToken, accessToken } = req.cookies;

    const user = await getSelfService({ refreshToken, accessToken });

    return {
      status: STATUS_CODES.SUCCESS,
      body: user,
    };
  },
};
