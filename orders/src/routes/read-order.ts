import express, { type Request, type Response } from 'express';
import { requireAuth, attachCurrentUser } from '@ticketster/common';
import { ORDERS_API_ENDPOINT } from '@/constants';
import { Order } from '@/models';

const router = express.Router();

router.get(
  `${ORDERS_API_ENDPOINT}/:id`,
  async (req: Request, res: Response) => {
    res.send('Hello from read order route: ' + req.params.id);
  },
);

router.get(
  `${ORDERS_API_ENDPOINT}`,
  requireAuth,
  attachCurrentUser,
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userId: req.currentUser!.id,
    }).populate('ticket');

    res.json(orders);
  },
);

export { router as readOrderRouter };
