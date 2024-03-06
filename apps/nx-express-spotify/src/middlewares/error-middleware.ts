import { Errback, NextFunction, Request, Response } from "express";
import { ApiError, ErrorStatusCodes } from "../exceptions";

export const errorMiddleware = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(err instanceof ApiError)) {
    res
      .status(ErrorStatusCodes.SERVER_ERROR)
      .json({ message: "Unknown server error", name: err.name });
    next(err);
    return;
  }
  res.status(err.status).json({ message: err.message, name: err.name });
  next(err);
};
