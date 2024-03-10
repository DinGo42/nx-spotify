// eslint-disable-next-line @typescript-eslint/naming-convention
export enum STATUS_CODES {
  CONFLICT = 409,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

interface ApiErrorProps extends Error {
  statusCode: STATUS_CODES;
}

export abstract class ApiError extends Error {
  statusCode: STATUS_CODES;
  constructor({ message, statusCode, name }: ApiErrorProps) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.UNAUTHORIZED,
      name: "Unauthorized",
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.NOT_FOUND,
      name: "NotFoundError",
    });
  }
}

export class ServerError extends ApiError {
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.SERVER_ERROR,
      name: "InternalServerError",
    });
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.CONFLICT,
      name: "ValidationError",
    });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super({
      message,
      statusCode: STATUS_CODES.FORBIDDEN,
      name: "ForbiddenError",
    });
  }
}
