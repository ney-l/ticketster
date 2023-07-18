import express, { type Request } from 'express';
import { BadRequestError } from '@/errors';
import { attachCurrentUser } from '@/middlewares';

const router = express.Router();

/**
 * @route   GET /api/users/current
 */
router.get('/api/users/current', attachCurrentUser, (req: Request, res) => {
  try {
    const { currentUser = null } = req;
    return res.json({ currentUser });
  } catch (error) {
    throw new BadRequestError('Invalid credentials');
  }
});

export { router as currentUserRouter };
