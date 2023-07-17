import logger from '@/logger';
import { type NextFunction, type Request, type Response } from 'express';

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { method, originalUrl } = req;
  logger.info(`${method} ${originalUrl}`);
  logger.debug(`Request body: ${JSON.stringify(req.body, null, 2)}`);
  next();
};
