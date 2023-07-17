import { type NextFunction, type Request, type Response } from 'express';
import { NotFoundError } from '@/errors/not-found-error';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw new NotFoundError();
};
