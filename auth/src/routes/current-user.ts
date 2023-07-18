import express from 'express';
import { BadRequestError } from '@/errors';
import { verifyJwt } from '@/services';

const router = express.Router();

/**
 * @route   GET /api/users/current
 */
router.get('/api/users/current', (req, res) => {
  if (!req.session?.jwt) {
    throw new BadRequestError('Invalid credentials');
  }

  try {
    const payload = verifyJwt(req.session.jwt);
    return res.json({ currentUser: payload });
  } catch (error) {
    throw new BadRequestError('Invalid credentials');
  }
});

export { router as currentUserRouter };
