import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/users/current
 */
router.get('/api/users/current', (req, res) => {
  res.json({ currentUser: {} });
});

export { router as currentUserRouter };
