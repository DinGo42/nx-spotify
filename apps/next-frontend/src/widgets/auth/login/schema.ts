import { userApiContract } from "@shared/api";
import { ClientInferRequest } from "@ts-rest/core";

export const loginUserSchema = userApiContract.auth.loginUser["body"];

export type LoginUserType = ClientInferRequest<typeof userApiContract.auth.loginUser>["body"];
