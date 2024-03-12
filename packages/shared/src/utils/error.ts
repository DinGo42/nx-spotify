import z from "zod";
import { StatusCodes, STATUS_CODES } from "../api";

interface ApiErrorProps extends Error {
  statusCode: StatusCodes;
}

export const ApiErrorConstructorSchema = <
  TName extends string,
  TStatus extends StatusCodes,
>(
  code: TStatus,
  name: TName,
) =>
  z.object({
    message: z.string(),
    stack: z.string().optional(),
    name: z.literal(name),
    statusCode: z.literal(code),
  });

export abstract class ApiError extends Error {
  statusCode: StatusCodes;
  abstract zodSchema: ReturnType<typeof ApiErrorConstructorSchema>;

  static createZodSchema<TName extends string, TStatus extends StatusCodes>(
    code: TStatus,
    name: TName,
  ) {
    return z.object({
      message: z.string(),
      stack: z.string().optional(),
      name: z.literal(name),
      statusCode: z.literal(code),
    });
  }
  constructor({ message, statusCode, name }: ApiErrorProps) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export class UnauthorizedError extends ApiError {
  zodSchema = ApiError.createZodSchema(
    STATUS_CODES.UNAUTHORIZED,
    "Unauthorized",
  );

  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.UNAUTHORIZED,
      name: "Unauthorized",
    });
  }
}

export class NotFoundError extends ApiError {
  zodSchema = ApiError.createZodSchema(STATUS_CODES.NOT_FOUND, "NotFoundError");
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.NOT_FOUND,
      name: "NotFoundError",
    });
  }
}

export class ServerError extends ApiError {
  zodSchema = ApiError.createZodSchema(
    STATUS_CODES.SERVER_ERROR,
    "InternalServerError",
  );
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.SERVER_ERROR,
      name: "InternalServerError",
    });
  }
}

export class ValidationError extends ApiError {
  zodSchema = ApiError.createZodSchema(
    STATUS_CODES.CONFLICT,
    "ValidationError",
  );
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.CONFLICT,
      name: "ValidationError",
    });
  }
}

export class ForbiddenError extends ApiError {
  zodSchema = ApiError.createZodSchema(
    STATUS_CODES.FORBIDDEN,
    "ForbiddenError",
  );
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.FORBIDDEN,
      name: "ForbiddenError",
    });
  }
}

export const ForbiddenErrorSchema = new ForbiddenError("").zodSchema;
export const ValidationErrorSchema = new ValidationError("").zodSchema;
export const ServerErrorSchema = new ServerError("").zodSchema;
export const NotFoundErrorSchema = new NotFoundError("").zodSchema;
export const UnauthorizedErrorSchema = new UnauthorizedError("").zodSchema;
