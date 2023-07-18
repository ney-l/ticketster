import request from 'supertest';
import { app } from '@/app';

const SIGNUP_ENDPOINT = '/api/users/signup';
const SIGNOUT_ENDPOINT = '/api/users/signout';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'password1!';

it('clears the cookie after signing out', async () => {
  // create a new user
  await request(app)
    .post(SIGNUP_ENDPOINT)
    .send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    })
    .expect(201);

  // sign in
  const response = await request(app)
    .post(SIGNOUT_ENDPOINT)
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')).toMatchInlineSnapshot(`
    [
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
    ]
  `);
});
