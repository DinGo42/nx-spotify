import { z } from "zod";

import { NotFoundErrorSchema } from "../../utils/error";
import { STATUS_CODES } from "../constants";
import { signUpSchema } from "../schemas";
import { ContractInstance } from "./type";

export const adminContract = (c: ContractInstance) =>
  c.router(
    {
      blockUser: {
        body: signUpSchema,
        method: "POST",
        path: `/blockUser`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
      createAdmin: {
        body: signUpSchema,
        method: "POST",
        path: "/createAdmin",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
      unblockUser: {
        body: signUpSchema,
        method: "POST",
        path: `/unblockUser`,
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
        },
      },
    },

    {
      pathPrefix: "/admin",
    },
  );
