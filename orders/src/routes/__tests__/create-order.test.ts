/* eslint-disable import/first */
jest.mock('@/nats-wrapper');

import request from 'supertest';
import { app } from '@/app';
import mongoose from 'mongoose';
import { getCookie } from '@/test/test-utils';
import { Order, OrderStatus, Ticket } from '@/models';
import { natsWrapper } from '@/nats-wrapper';

const VALID_TICKET_TITLE = 'some title';
const VALID_TICKET_PRICE = 10;

it('returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  const cookie = getCookie();

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId })
    .expect(400);

  expect(response.body.errors).toContainEqual({
    message: 'Invalid Ticket ID.',
  });
});

it('returns an error if the ticket is already reserved', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: VALID_TICKET_TITLE,
    price: VALID_TICKET_PRICE,
  });
  await ticket.save();

  // create an order with this ticket id with a status that is *not* cancelled
  const order = Order.build({
    ticket,
    userId: 'some-user-id',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  // verify error
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getCookie())
    .send({ ticketId: ticket.id });
  expect(400);

  expect(response.body.errors).toContainEqual({
    message: 'Ticket is already reserved.',
  });
});

it('reserves a ticket', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: VALID_TICKET_TITLE,
    price: VALID_TICKET_PRICE,
  });
  await ticket.save();

  // create an order for this ticket
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getCookie())
    .send({ ticketId: ticket.id });
  // .expect(201);

  expect(response.body.id).toBeDefined();
  expect(response.body.ticket.id).toBe(ticket.id);
  expect(response.body.ticket.title).toBe(VALID_TICKET_TITLE);
  expect(response.body.ticket.price).toBe(VALID_TICKET_PRICE);
});

it('publishes an order created event', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: VALID_TICKET_TITLE,
    price: VALID_TICKET_PRICE,
  });
  await ticket.save();

  // create an order for this ticket
  await request(app)
    .post('/api/orders')
    .set('Cookie', getCookie())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
