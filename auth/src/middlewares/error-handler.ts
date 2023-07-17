import { CustomError, GenericError } from '@/errors';
import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  const error = new GenericError(err.message);
  res.status(error.statusCode).json(error.serializeErrors());
};
