import { type NextFunction, type Request, type Response } from 'express';
import { NotFoundError } from '@/errors';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw new NotFoundError();
};
