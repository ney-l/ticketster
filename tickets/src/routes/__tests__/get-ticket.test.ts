/* eslint-disable import/first */
jest.mock('@/nats-wrapper');
import request from 'supertest';

import { app } from '@/app';
import { getCookie } from '@/test/test-utils';

const TICKETS_ENDPOINT = '/api/tickets';
const VALID_PRICE = 10;
const VALID_TITLE = 'some title';

beforeEach(() => jest.clearAllMocks());

test('it returns a 404 if the ticket is not found', async () => {
  const INVALID_ID = 'invalid-id';

  const response = await request(app)
    .get(`${TICKETS_ENDPOINT}/${INVALID_ID}`)
    .send()
    .expect(404);

  expect(response.status).toBe(404);
});

test('it returns the ticket if the ticket exists', async () => {
  // create a ticket
  const response = await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE, price: VALID_PRICE })
    .expect(201);

  const { id } = response.body;

  expect(typeof id).toBe('string');

  if (typeof id !== 'string') {
    throw new Error('id is not a string');
  }

  // fetch the ticket
  const ticketResponse = await request(app)
    .get(`${TICKETS_ENDPOINT}/${id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(VALID_TITLE);
  expect(ticketResponse.body.price).toEqual(VALID_PRICE);
});
