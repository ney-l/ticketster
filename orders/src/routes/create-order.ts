import express, { type Request, type Response } from 'express';
import { ORDERS_API_ENDPOINT } from '@/constants';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validate as validateRequest,
} from '@ticketster/common';
import { z } from 'zod';
import { Order, Ticket } from '@/models';

export const ticketRequestSchema = z.object({
  body: z.object({
    ticketId: z.string({ required_error: 'Ticket Id is required.' }).trim(),
  }),
});

const EXPIRATION_WINDOW_SECONDS = 15 * 60; // 15 minutes

const router = express.Router();

router.post(
  ORDERS_API_ENDPOINT,
  requireAuth,
  validateRequest(ticketRequestSchema),
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new BadRequestError('Invalid Ticket ID.');
    }

    // Make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved.');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // TODO: Publish an event saying that an order was created

    res.status(201).json(order);
  },
);

export { router as createOrderRouter };
