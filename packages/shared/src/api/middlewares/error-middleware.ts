import { Prisma } from "@db";
import { Errback, NextFunction, Request, Response } from "express";
import { ApiError, getErrorInfo } from "../../utils";
import { STATUS_CODES } from "../constants";

export const errorMiddleware = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message, name: err.name, stack: err.stack });
    next(err);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { message, name, stack, statusCode } = getErrorInfo(err);
    res.status(statusCode).json({ message, name, stack });
    next(err);
    return;
  }

  res.status(STATUS_CODES.SERVER_ERROR).json({ message: "Unknown server error", name: err.name });

  next(err);
};
