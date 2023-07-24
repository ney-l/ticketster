import request from 'supertest';
import { app } from '@/app';
import { getCookie } from '@/test/test-utils';

const TICKETS_ENDPOINT = '/api/tickets';
const VALID_PRICE = 10;
const VALID_TITLE = 'some title';

const createTicket = async () =>
  await request(app)
    .post(TICKETS_ENDPOINT)
    .set('Cookie', getCookie())
    .send({ title: VALID_TITLE, price: VALID_PRICE });

test('it fetches a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(TICKETS_ENDPOINT).send().expect(200);

  expect(response.body.length).toEqual(3);
});
