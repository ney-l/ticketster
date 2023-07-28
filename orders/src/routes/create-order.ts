import express, { type Request, type Response } from 'express';
import { ORDERS_API_ENDPOINT } from '@/constants';
import { requireAuth, validate as validateRequest } from '@ticketster/common';
import { z } from 'zod';

export const ticketRequestSchema = z.object({
  body: z.object({
    ticketId: z.string({ required_error: 'Ticket Id is required.' }).trim(),
  }),
});

const router = express.Router();

router.post(
  ORDERS_API_ENDPOINT,
  requireAuth,
  validateRequest(ticketRequestSchema),
  async (req: Request, res: Response) => {
    res.send('Hello from create orders route');
  },
);

export { router as createOrderRouter };
