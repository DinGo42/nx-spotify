import { AppRoute, initContract } from "@ts-rest/core";
import { AppRouteOptions } from "@ts-rest/express";

export type ContractInstance = ReturnType<typeof initContract>;

type Router<TRoute extends AppRoute> = AppRouteOptions<TRoute>;

export type ContractRouteHandler<TRoute extends AppRoute> = Router<TRoute>["handler"];
export type ContractRouteMiddleware<TRoute extends AppRoute> = Router<TRoute>["middleware"];
