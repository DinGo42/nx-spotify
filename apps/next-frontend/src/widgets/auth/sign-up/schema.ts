import { userApiContract } from "@shared/api";
import { ClientInferRequest } from "@ts-rest/core";

export const signUpSchema = userApiContract.auth.signup["body"];
export type CreateUserType = ClientInferRequest<typeof userApiContract.auth.signup>["body"];
