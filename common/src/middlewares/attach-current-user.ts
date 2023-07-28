import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { type UserPayload } from '@/types';
import env from '@/environments';
import { logger } from '..';

const verifyJwt = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};

/**
 * Attach the current user to the request object
 * if the user is authenticated.
 * Otherwise, do nothing and just call next().
 */
export const attachCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    logger.debug(
      'No session or no jwt found. Handing over to the next middleware.'
    );
    return next();
  }

  try {
    const payload = verifyJwt(req.session.jwt) as UserPayload;
    req.currentUser = payload;
    logger.debug(
      'User is authenticated. Attached user and now handing over to the next middleware.'
    );
    return next();
  } catch (err) {
    logger.debug(
      `User is not authenticated. Handing over to the next middleware.`,
      err
    );
    return next();
  }
};
