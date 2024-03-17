import { authContract } from "@shared";
import { cookies } from "next/headers";
import { ServerInferResponses, initClient } from "@ts-rest/core";

type ApiResponseShapes = ServerInferResponses<typeof authContract>;

export type ApiResponse<T extends keyof ApiResponseShapes> = ServerInferResponses<(typeof authContract)[T]>;

export const api = initClient(authContract, {
  api: async ({ body, cache, credentials, headers, method, next, path, route, signal }) => {
    const result = await fetch(path, {
      body,
      cache,
      credentials,
      headers,
      method,
      next,
      signal,
    });

    const contentType = result.headers.get("content-type");

    if (contentType?.includes("application/") && contentType?.includes("json")) {
      if (!route.validateResponseOnClient) {
        return {
          body: await result.json(),
          headers: result.headers,
          status: result.status,
        };
      }

      const jsonData = await result.json();
      const statusCode = result.status;
      const response = route.responses[statusCode];

      return {
        body: response && typeof response !== "symbol" && "parse" in response ? response?.parse(jsonData) : jsonData,
        headers: result.headers,
        status: statusCode,
      };
    }

    if (contentType?.includes("text/")) {
      return {
        body: await result.text(),
        headers: result.headers,
        status: result.status,
      };
    }
    console.log(credentials, result.headers);
    return {
      body: await result.blob(),
      headers: result.headers,
      status: result.status,
    };
  },
  baseHeaders: {
    cookie: cookies()
      .getAll()
      .map((key) => key.name + "=" + key.value)
      .join("; "),
  },
  credentials: "include",
  baseUrl: "http://localhost:3333",
});
