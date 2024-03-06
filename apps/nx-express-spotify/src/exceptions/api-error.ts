export enum ErrorStatusCodes {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

interface ApiErrorProps extends Error {
  status: ErrorStatusCodes;
}

export class ApiError extends Error {
  status: ErrorStatusCodes;
  constructor({ message, name, status, stack }: ApiErrorProps) {
    super();
    this.status = status;
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
  static UnauthorizedError() {
    return new ApiError({
      status: ErrorStatusCodes.UNAUTHORIZED,
      message: "User unauthorized",
      name: "unauthorized",
    });
  }

  static BadRequest(message: string, name: string, stack?: string) {
    return new ApiError({
      status: ErrorStatusCodes.BAD_REQUEST,
      message,
      name,
      stack,
    });
  }

  static CustomError(
    status: ErrorStatusCodes,
    message: string,
    name: string,
    stack?: string,
  ) {
    return new ApiError({ status, message, name, stack });
  }
}
