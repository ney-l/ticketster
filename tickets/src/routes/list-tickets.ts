import express, { type Request, type Response } from 'express';
import { Ticket } from '@/models';

const router = express.Router();

const TICKETS_ENDPOINT = '/api/tickets';

/**
 * @route   GET /api/tickets
 * @desc    Get a list of tickets
 */
router.get(TICKETS_ENDPOINT, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  return res.status(200).json(tickets);
});

export { router as listTicketsRouter };
