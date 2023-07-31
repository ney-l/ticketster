/* eslint-disable import/first */
jest.mock('@/nats-wrapper');

import request from 'supertest';
import { app } from '@/app';
import { buildTicket, getCookie } from '@/test';
import { OrderStatus } from '@ticketster/common';
import { natsWrapper } from '@/nats-wrapper';

it('marks an order as cancelled', async () => {
  // create a ticket with Ticket Model
  const user = getCookie();
  const ticket = await buildTicket();

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .put(`/api/orders/${order.id as string}/cancel`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // fetch the order
  const { body: cancelledOrder } = await request(app)
    .get(`/api/orders/${order.id as string}`)
    .set('Cookie', user)
    .send();

  // expect the order to be cancelled
  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  // create a ticket with Ticket Model
  const user = getCookie();
  const ticket = await buildTicket();

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .put(`/api/orders/${order.id as string}/cancel`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
