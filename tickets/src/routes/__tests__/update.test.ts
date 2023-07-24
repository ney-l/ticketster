import request from 'supertest';
import { app } from '@/app';
import { getCookie } from '@/test/test-utils';
import mongoose from 'mongoose';

const VALID_TITLE = 'valid-title';
const VALID_PRICE = 10;
const TICKETS_ENDPOINT = '/api/tickets';
const INVALID_ID = new mongoose.Types.ObjectId().toHexString();

test('returns a 404 if the provided id does not exist', async () => {
  await request(app)
    .put(`${TICKETS_ENDPOINT}/${INVALID_ID}`)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE, price: VALID_PRICE })
    .expect(404);
});

test('returns a 401 if the user is not authenticated', async () => {
  await request(app)
    .put(`${TICKETS_ENDPOINT}/${INVALID_ID}`)
    .send({ title: VALID_TITLE, price: VALID_PRICE })
    .expect(401);
});

test('returns a 401 if the user does not own the ticket', async () => {
  const userOneCookie = getCookie();
  const response = await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', userOneCookie)
    .send({ title: VALID_TITLE, price: VALID_PRICE });

  const ticketId = response.body.id;
  if (typeof ticketId !== 'string') {
    throw new Error('ticketId is not a string');
  }

  const userTwoCookie = getCookie();
  await request(app)
    .put(`${TICKETS_ENDPOINT}/${ticketId}`)
    .set('Cookie', userTwoCookie)
    .send({ title: `${VALID_TITLE} updated`, price: VALID_PRICE })
    .expect(401);
});

test('return a 400 if the user provides an invalid title or price', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', cookie)
    .send({ title: VALID_TITLE, price: VALID_PRICE });

  const ticketId = response.body.id;
  if (typeof ticketId !== 'string') {
    throw new Error('ticketId is not a string');
  }

  await request(app)
    .put(`${TICKETS_ENDPOINT}/${ticketId}`)
    .set('Cookie', cookie)
    .send({ title: '', price: VALID_PRICE })
    .expect(400);

  await request(app)
    .put(`${TICKETS_ENDPOINT}/${ticketId}`)
    .set('Cookie', cookie)
    .send({ title: VALID_TITLE, price: -10 })
    .expect(400);
});

test('updates the ticket provided valid inputs', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', cookie)
    .send({ title: VALID_TITLE, price: VALID_PRICE });

  const ticketId = response.body.id;
  if (typeof ticketId !== 'string') {
    throw new Error('ticketId is not a string');
  }

  const updatedTitle = `${VALID_TITLE} updated`;
  const updatedPrice = 20;

  const updateResponse = await request(app)
    .put(`${TICKETS_ENDPOINT}/${ticketId}`)
    .set('Cookie', cookie)
    .send({ title: updatedTitle, price: updatedPrice })
    .expect(200);

  expect(updateResponse.body.title).toEqual(updatedTitle);
  expect(updateResponse.body.price).toEqual(updatedPrice);
});
