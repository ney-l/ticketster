import express from 'express';

const router = express.Router();

/**
 * @route   POST /api/users/signin
 */
router.post('/api/users/signin', (req, res) => {
  res.json({ message: 'Sign in' });
});

export { router as signinRouter };
