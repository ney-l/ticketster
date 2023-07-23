import express, {
  type Request,
  type NextFunction,
  type Response,
} from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, validate } from '@ticketster/common';
import { User } from '@/models/user';
import { PasswordManager, generateJwt } from '@/services';

const router = express.Router();

const signinRequestSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Not a valid email'),
    password: z.string({ required_error: 'Password is required' }).trim(),
  }),
});

/**
 * @route   POST /api/users/signin
 */
router.post(
  '/api/users/signin',
  validate(signinRequestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user === null) {
      throw new BadRequestError('Invalid credentials');
    }

    const isValidPassword = await PasswordManager.isValid(
      user.password,
      password,
    );

    if (!isValidPassword) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const jwt = generateJwt({ id: user.id, email: user.email });
    // Store it on session object
    req.session = { jwt };

    return res.status(StatusCodes.OK).json(user);
  },
);

export { router as signinRouter };
