import express from 'express';

const router = express.Router();

/**
 * @route   POST /api/users/signup
 */
router.post('/api/users/signup', (req, res) => {
  const { email, password } = req.body;
  res.json({ message: 'Sign up' });
});

export { router as signupRouter };
