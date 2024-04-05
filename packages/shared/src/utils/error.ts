import { z } from "zod";

import { STATUS_CODES, StatusCodes } from "../api";

interface ApiErrorProps extends Error {
  statusCode: StatusCodes;
}

export const ApiErrorConstructorSchema = <TName extends string, TStatus extends StatusCodes>(
  code: TStatus,
  name: TName,
) =>
  z.object({
    message: z.string(),
    name: z.literal(name),
    stack: z.string().optional(),
    statusCode: z.literal(code),
  });

export abstract class ApiError extends Error {
  statusCode: StatusCodes;
  constructor({ message, name, statusCode }: ApiErrorProps) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }

  static createZodSchema<TName extends string, TStatus extends StatusCodes>(code: TStatus, name: TName) {
    return z.object({
      message: z.string(),
      name: z.literal(name),
      stack: z.string().optional(),
      statusCode: z.literal(code),
    });
  }
  abstract zodSchema: ReturnType<typeof ApiErrorConstructorSchema>;
}

export class UnauthorizedError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.UNAUTHORIZED, "Unauthorized");

  constructor(message: string) {
    super({
      message,
      name: "Unauthorized",
      statusCode: STATUS_CODES.UNAUTHORIZED,
    });
  }
}

export class NotFoundError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.NOT_FOUND, "NotFoundError");
  constructor(message: string) {
    super({
      message,
      name: "NotFoundError",
      statusCode: STATUS_CODES.NOT_FOUND,
    });
  }
}

export class ServerError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.SERVER_ERROR, "InternalServerError");
  constructor(message: string) {
    super({
      message,
      name: "InternalServerError",
      statusCode: STATUS_CODES.SERVER_ERROR,
    });
  }
}

export class ValidationError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.CONFLICT, "ValidationError");
  constructor(message: string) {
    super({
      message,
      name: "ValidationError",
      statusCode: STATUS_CODES.CONFLICT,
    });
  }
}

export class ForbiddenError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.FORBIDDEN, "ForbiddenError");
  constructor(message: string) {
    super({
      message,
      name: "ForbiddenError",
      statusCode: STATUS_CODES.FORBIDDEN,
    });
  }
}

export const ForbiddenErrorSchema = new ForbiddenError("").zodSchema;
export const ValidationErrorSchema = new ValidationError("").zodSchema;
export const ServerErrorSchema = new ServerError("").zodSchema;
export const NotFoundErrorSchema = new NotFoundError("").zodSchema;
export const UnauthorizedErrorSchema = new UnauthorizedError("").zodSchema;
