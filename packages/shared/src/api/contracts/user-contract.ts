import { userSchema } from "@db/schemas";
import { z } from "zod";

import { NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { updateAccountSchema } from "../schemas";
import { ContractInstance } from "./type";

export const userContract = (c: ContractInstance) =>
  c.router(
    {
      deleteAccount: {
        method: "GET",
        path: "/delete",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: null,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      getSelf: {
        method: "GET",
        path: "/get-self",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: userSchema.omit({
            listeningHistory: true,
            password: true,
          }),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      updateAccount: {
        body: updateAccountSchema,
        method: "POST",
        path: "/update",
        responses: {
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
    },
    {
      pathPrefix: "/user",
    },
  );
