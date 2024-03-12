import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { NotFoundErrorSchema, STATUS_CODES } from "@shared";

const c = initContract();

const userSchema = z.object({
  email: z.string().email(),
});

export const adminContract = c.router(
  {
    createAdmin: {
      method: "POST",
      path: "/createAdmin",
      responses: {
        [STATUS_CODES.SUCCESS]: z.null(),
        [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
      },
      body: userSchema,
    },
    blockUser: {
      method: "POST",
      path: `/blockUser`,
      responses: {
        [STATUS_CODES.SUCCESS]: z.null(),
      },
      body: userSchema,
    },
    unblockUser: {
      method: "POST",
      path: `/unblockUser`,
      responses: {
        [STATUS_CODES.SUCCESS]: z.null(),
        [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
      },
      body: userSchema,
    },
  },

  {
    pathPrefix: "/admin",
  },
);
