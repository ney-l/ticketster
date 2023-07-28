import request from 'supertest';
import { app } from '@/app';
import { buildTicket, getCookie } from '@/test';

it('fetches orders for a particular user', async () => {
  // Create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1Cookie = getCookie();
  const user2Cookie = getCookie();

  // Create on order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', user1Cookie)
    .send({ ticketId: ticket1.id })
    .expect(201);

  // Create two orders as User #2
  const { body: user2order1 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2Cookie)
    .send({ ticketId: ticket2.id })
    .expect(201);
  const { body: user2order2 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2Cookie)
    .send({ ticketId: ticket3.id })
    .expect(201);

  // Make request to get orders for User #2
  const { body: orders } = await request(app)
    .get('/api/orders')
    .set('Cookie', user2Cookie)
    .expect(200);

  // Make sure we only get the orders for User #2
  expect(orders.length).toEqual(2);
  expect(orders[0].id).toEqual(user2order1.id);
  expect(orders[0].ticket.id).toEqual(ticket2.id);
  expect(orders[1].id).toEqual(user2order2.id);
  expect(orders[1].ticket.id).toEqual(ticket3.id);
});
