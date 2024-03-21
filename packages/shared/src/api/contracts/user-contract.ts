import { userSchema } from "@bd";
import { NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./type";
import { z } from "zod";

export const userContract = (c: ContractInstance) =>
  c.router(
    {
      getSelf: {
        method: "GET",
        path: "/get-self",
        responses: {
          [STATUS_CODES.SUCCESS]: userSchema.omit({
            password: true,
            listeningHistory: true,
          }),
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
      updateAccount: {
        method: "POST",
        path: "/update",
        responses: {
          [STATUS_CODES.SUCCESS]: z.null(),
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
        body: userSchema
          .omit({
            id: true,
            createdAt: true,
            banned: true,
          })
          .partial(),
      },
      deleteAccount: {
        method: "GET",
        path: "/delete-account",
        responses: {
          [STATUS_CODES.SUCCESS]: null,
          [STATUS_CODES.NOT_FOUND]: NotFoundErrorSchema,
          [STATUS_CODES.UNAUTHORIZED]: UnauthorizedErrorSchema,
        },
      },
    },
    {
      pathPrefix: "/user",
    },
  );
