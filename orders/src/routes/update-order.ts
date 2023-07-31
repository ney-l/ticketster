import express, { type Request, type Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from '@ticketster/common';
import { ORDERS_API_ENDPOINT } from '@/constants';
import { Order, OrderStatus } from '@/models';
import { OrderCancelledPublisher } from '@/events';
import { natsWrapper } from '@/nats-wrapper';

const router = express.Router();

router.put(
  `${ORDERS_API_ENDPOINT}/:id`,
  async (req: Request, res: Response) => {
    res.send('Hello from update order route: ' + req.params.id);
  },
);

router.put(
  `${ORDERS_API_ENDPOINT}/:orderId/cancel`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    // get order from db
    const order = await Order.findById(orderId).populate('ticket');

    // check if order exists
    if (!order) {
      throw new NotFoundError();
    }

    // check if order belongs to user
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // check if order is already cancelled
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Order is already cancelled');
    }

    // cancel order
    order.status = OrderStatus.Cancelled;
    await order.save();

    // * Publish Order Cancelled Event
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    // send response
    res.status(204).send();
  },
);

export { router as updateOrderRouter };
