import request from 'supertest';

import { app } from '@/app';

const SIGNIN_ENDPOINT = '/api/users/signin';
const SIGNUP_ENDPOINT = '/api/users/signup';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'password1!';

it('returns 400 when an unregistered email is provided', async () => {
  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({ email: 'test@test.com', password: VALID_PASSWORD })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Invalid credentials",
        },
      ],
    }
  `);
});

it('returns 400 when invalid password is provided', async () => {
  await request(app)
    .post(SIGNUP_ENDPOINT)
    .send({ email: VALID_EMAIL, password: VALID_PASSWORD })
    .expect(201);

  const INVALID_PASSWORD = 'abc';

  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({ email: VALID_EMAIL, password: INVALID_PASSWORD })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Invalid credentials",
        },
      ],
    }
  `);
});

it('sets cookie when valid credentials are provided', async () => {
  await request(app)
    .post(SIGNUP_ENDPOINT)
    .send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    })
    .expect(201);

  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns 400 when email is not provided', async () => {
  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({
      password: VALID_PASSWORD,
    })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Email is required",
          "param": "body.email",
        },
      ],
    }
  `);
});

it('returns 400 when password is not provided', async () => {
  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({
      email: VALID_EMAIL,
    })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Password is required",
          "param": "body.password",
        },
      ],
    }
  `);
});

it('returns 400 when email and password are not provided', async () => {
  const response = await request(app)
    .post(SIGNIN_ENDPOINT)
    .send({})
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Email is required",
          "param": "body.email",
        },
        {
          "message": "Password is required",
          "param": "body.password",
        },
      ],
    }
  `);
});
