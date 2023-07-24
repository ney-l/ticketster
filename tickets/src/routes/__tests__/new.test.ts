import request from 'supertest';

import { app } from '@/app';
import { getCookie } from '@/test/test-utils';
import { Ticket } from '@/models';

const TICKETS_ENDPOINT = '/api/tickets';
const VALID_PRICE = 10;
const VALID_TITLE = 'some title';
const INVALID_PRICE = -10;

test('app has a route handler listening at /api/tickets for POST requests', async () => {
  const response = await request(app).post(TICKETS_ENDPOINT).send({});

  expect(response.status).not.toBe(404);
});

test('it can only be accessed if the user is signed in', async () => {
  const response = await request(app).post(TICKETS_ENDPOINT).send({});

  expect(response.status).toBeGreaterThanOrEqual(400);
});

test('it returns a status lower than 400 if the user is signed in', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', cookie)
    .send({ title: VALID_TITLE, price: VALID_PRICE });

  expect(response.status).toBeLessThan(400);
});

test('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: '', price: VALID_PRICE })
    .expect(400);

  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ price: VALID_PRICE })
    .expect(400);
});

test('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE, price: INVALID_PRICE })
    .expect(400);

  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE })
    .expect(400);
});

test('creates a ticket with valid inputs', async () => {
  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE, price: VALID_PRICE })
    .expect(201);

  const ticketsAfter = await Ticket.find({});
  expect(ticketsAfter.length).toEqual(1);
});
