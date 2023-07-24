import express, { type Request, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, validate as validateRequest } from '@ticketster/common';
import { Ticket } from '@/models/ticket';

const router = express.Router();

const TICKETS_ENDPOINT = '/api/tickets';

const createTicketRequestSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required.' })
      .min(1, 'Title cannot be blank.')
      .trim(),
    price: z
      .number({
        required_error: 'Price is required.',
        invalid_type_error: 'Price must be a number.',
      })
      .gt(0, 'Price must be greater than 0.'),
  }),
});

/**
 * @route   POST /api/tickets
 * @desc    Create a ticket
 */
router.post(
  TICKETS_ENDPOINT,
  requireAuth,
  validateRequest(createTicketRequestSchema),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });

    await ticket.save();

    res.status(201).json(ticket);
  },
);

export { router as createTicketRouter };
