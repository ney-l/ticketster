import express, { type Request } from 'express';
import { attachCurrentUser } from '@/middlewares';

const router = express.Router();

/**
 * @route   GET /api/users/current
 */
router.get('/api/users/current', attachCurrentUser, (req: Request, res) => {
  const { currentUser = null } = req;
  return res.json({ currentUser });
});

export { router as currentUserRouter };
