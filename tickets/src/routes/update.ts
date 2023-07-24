import express, { type Request, type Response } from 'express';
import { Ticket } from '@/models';
import {
  NotAuthorizedError,
  NotFoundError,
  attachCurrentUser,
  requireAuth,
  validate,
} from '@ticketster/common';
import { ticketRequestSchema } from './new';

const router = express.Router();

const TICKETS_ENDPOINT = '/api/tickets';

router.put(
  `${TICKETS_ENDPOINT}/:id`,
  attachCurrentUser,
  requireAuth,
  validate(ticketRequestSchema),
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket === null) {
      throw new NotFoundError();
    }

    // user is not authorized to update this ticket
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body;
    ticket.set({ title, price });
    await ticket.save();

    return res.status(200).json(ticket);
  },
);

export { router as updateTicketRouter };
