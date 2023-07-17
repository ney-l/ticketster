import express from 'express';

const router = express.Router();

/**
 * @route   POST /api/users/signup
 */
router.post('/api/users/signup', (req, res) => {
  res.json({ message: 'Sign up' });
});

export { router as signupRouter };
