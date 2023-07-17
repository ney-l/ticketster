import express, { type Request, type Response } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares';

const router = express.Router();

const signupRequestSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be between 8 and 20 characters')
      .max(20, 'Password must be between 8 and 20 characters')
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'Password must contain at least one alphabet character',
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one numeric character',
      })
      .refine((value) => /[!@#$%^&*()]/.test(value), {
        message: 'Password must contain at least one symbol character',
      }),
  }),
});

/**
 * @route   POST /api/users/signup
 */
router.post('/api/users/signup', validate(signupRequestSchema), (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.json({ message: 'Sign up', email, password });
});

export { router as signupRouter };
