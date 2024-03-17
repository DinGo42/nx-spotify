import { authContract } from "@shared";
import { ClientInferRequest } from "@ts-rest/core";

export const createUserSchema = authContract.createUser["body"];
export type CreateUserType = ClientInferRequest<typeof authContract.createUser>["body"];
