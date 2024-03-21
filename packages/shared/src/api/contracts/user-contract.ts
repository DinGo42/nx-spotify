import { userSchema } from "@bd";
import { NotFoundErrorSchema, UnauthorizedErrorSchema } from "../../utils";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./type";

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
    },
    {
      pathPrefix: "/user",
    },
  );
