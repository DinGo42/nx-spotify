import { z } from "zod";
import { ContractInstance, NotFoundErrorSchema, STATUS_CODES, signUpSchema } from "@shared";

export const adminContract = (c: ContractInstance) =>
  c.router(
    {
      createAdmin: {
        method: "POST",
        path: "/createAdmin",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
        },
        body: signUpSchema,
      },
      blockUser: {
        method: "POST",
        path: `/blockUser`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
        },
        body: signUpSchema,
      },
      unblockUser: {
        method: "POST",
        path: `/unblockUser`,
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
        },
        body: signUpSchema,
      },
    },

    {
      pathPrefix: "/admin",
    },
  );
