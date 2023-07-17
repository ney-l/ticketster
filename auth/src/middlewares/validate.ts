import { RequestValidationError } from '@/errors';
import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RequestValidationError(error.errors);
      }

      throw error;
    }
  };
