import express, { type Request, type Response } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares';
import { User } from '@/models/user';
import { BadRequestError } from '@/errors';
import { StatusCodes } from 'http-status-codes';
import { generateJwt } from '@/services';

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
router.post(
  '/api/users/signup',
  validate(signupRequestSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser !== null) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const jwt = generateJwt({ id: user.id, email: user.email });

    // Store it on session object
    req.session = { jwt };

    res.status(StatusCodes.CREATED).json(user);
  },
);

export { router as signupRouter };
