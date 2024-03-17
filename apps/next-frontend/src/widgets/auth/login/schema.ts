import { authContract } from "@shared";
import { ClientInferRequest } from "@ts-rest/core";

export const loginUserSchema = authContract.loginUser?.body;

export type LoginUserType = ClientInferRequest<typeof authContract.loginUser>["body"];
