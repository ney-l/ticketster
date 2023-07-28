import express, { type Request, type Response } from 'express';
import {
  requireAuth,
  attachCurrentUser,
  NotFoundError,
  NotAuthorizedError,
} from '@ticketster/common';
import { ORDERS_API_ENDPOINT } from '@/constants';
import { Order } from '@/models';

const router = express.Router();

router.get(
  `${ORDERS_API_ENDPOINT}/:id`,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.json(order);
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
