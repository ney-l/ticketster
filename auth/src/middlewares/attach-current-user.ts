import { type UserPayload } from '@/types';
import { verifyJwt } from '@/services';
import { type Request, type Response, type NextFunction } from 'express';

export const attachCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = verifyJwt(req.session.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    // error will be caught further down the chain
  } finally {
    next();
  }
};
