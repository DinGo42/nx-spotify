import { adminService } from "../services";
import { RecursiveRouterObj } from "@ts-rest/express/src/lib/types";
import { STATUS_CODES } from "@shared";
import { adminContract } from "../contracts";

const {
  createAdmin: createAdminService,
  blockUser: blockUserService,
  unblockUser: unblockUserService,
} = adminService();

export const adminController: RecursiveRouterObj<typeof adminContract> = {
  createAdmin: async ({ req }) => {
    const { email } = req.body;

    await createAdminService({
      email,
    });

    return {
      status: STATUS_CODES.SUCCESS,
      body: null,
    };
  },
  blockUser: async ({
    req: {
      body: { email },
    },
  }) => {
    blockUserService({ email });

    return {
      status: STATUS_CODES.SUCCESS,
      body: null,
    };
  },
  unblockUser: async ({
    req: {
      body: { email },
    },
  }) => {
    unblockUserService({ email });

    return {
      status: STATUS_CODES.SUCCESS,
      body: null,
    };
  },
};
