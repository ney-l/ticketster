import { CustomError, GenericError, NotFoundError } from '@/errors';
import logger from '@/logger';
import { type NextFunction, type Request, type Response } from 'express';

const MONGOOSE_NOT_FOUND_ERROR = 'CastError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    if (err.statusCode >= 500) {
      logErrors(err);
    }
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  if (err instanceof Error && err.name === MONGOOSE_NOT_FOUND_ERROR) {
    const error = new NotFoundError();
    return res.status(error.statusCode).json(error.serializeErrors());
  }

  logErrors(err);
  const error = new GenericError(err.message);
  res.status(error.statusCode).json(error.serializeErrors());
};

const logErrors = (err: Error) => {
  logger.error(err.stack);
};
