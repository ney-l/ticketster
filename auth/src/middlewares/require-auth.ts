import { type Request, type Response, type NextFunction } from 'express';
import { NotAuthorizedError } from '@/errors';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
