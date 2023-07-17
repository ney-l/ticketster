import express from 'express';

const router = express.Router();

/**
 * @route   POST /api/users/signout
 */
router.post('/api/users/signout', (req, res) => {
  res.json({ message: 'Sign out' });
});

export { router as signoutRouter };
