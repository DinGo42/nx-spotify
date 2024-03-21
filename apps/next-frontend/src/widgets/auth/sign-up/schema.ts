import { userApiContract } from "@shared";
import { ClientInferRequest } from "@ts-rest/core";

export const signUpSchema = userApiContract.auth.createUser["body"];
export type CreateUserType = ClientInferRequest<typeof userApiContract.auth.createUser>["body"];
