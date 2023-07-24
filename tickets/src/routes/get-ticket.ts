import express, { type Request, type Response } from 'express';
import { Ticket } from '@/models';
import { NotFoundError } from '@ticketster/common';

const router = express.Router();

const TICKETS_ENDPOINT = '/api/tickets';

/**
 * @route   GET /api/tickets/:id
 * @desc    Get a ticket
 */
router.get(`${TICKETS_ENDPOINT}/:id`, async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket === null) {
      throw new NotFoundError();
    }

    res.status(200).json(ticket);
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      throw new NotFoundError();
    }
    throw error;
  }
});

export { router as getTicketsRouter };
