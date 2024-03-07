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

export class ApiError extends Error {
  statusCode: STATUS_CODES;
  errorFields: string[];
  constructor({ message, name, statusCode: status, stack }: ApiErrorProps) {
    super();
    this.statusCode = status;
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
  static UnauthorizedError() {
    return new ApiError({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: "User unauthorized",
      name: "unauthorized",
    });
  }
  static NotFoundError() {
    return new ApiError({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Not found error",
      name: "NotFoundError",
    });
  }
  static ServerError() {
    return new ApiError({
      statusCode: STATUS_CODES.SERVER_ERROR,
      message: "Internal server error",
      name: "InternalServerError",
    });
  }

  static ValidationError() {
    return new ApiError({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Data has not passed validation",
      name: "ValidationError",
    });
  }
  static ForbiddenError() {
    return new ApiError({
      statusCode: STATUS_CODES.FORBIDDEN,
      message: "Forbidden error",
      name: "ForbiddenError",
    });
  }
}

export const {
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ValidationError,
} = ApiError;
