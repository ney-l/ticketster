import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};
