import express from 'express';

const router = express.Router();

/**
 * @route   POST /api/users/signout
 */
router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.json({ message: 'Signed out!' });
});

export { router as signoutRouter };
