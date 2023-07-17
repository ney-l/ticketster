import { CustomError, GenericError } from '@/errors';
import logger from '@/logger';
import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    if (err.statusCode >= 500) {
      logErrors(err);
    }
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  logErrors(err);
  const error = new GenericError(err.message);
  res.status(error.statusCode).json(error.serializeErrors());
};

const logErrors = (err: Error) => {
  logger.error(err.stack);
};
