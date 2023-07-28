import express, { type Request, type Response } from 'express';
import { ORDERS_API_ENDPOINT } from '@/constants';

const router = express.Router();

router.delete(
  `${ORDERS_API_ENDPOINT}/:id`,
  async (req: Request, res: Response) => {
    res.send('Hello from delete orde route: ' + req.params.id);
  },
);

export { router as deleteOrderRouter };
