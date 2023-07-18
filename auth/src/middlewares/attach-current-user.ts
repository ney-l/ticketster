import { type UserPayload } from '@/types';
import { verifyJwt } from '@/services';
import { type Request, type Response, type NextFunction } from 'express';
import { BadRequestError, NotAuthorizedError } from '@/errors';

export const attachCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    throw new BadRequestError('Missing Authentication Token.');
  }

  try {
    const payload = verifyJwt(req.session.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  } finally {
    next();
  }
};
