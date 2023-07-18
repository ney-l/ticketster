import request from 'supertest';
import { app } from '@/app';

const API_ENDPOINT = '/api/users/signup';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'password1!';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = 'abc';

it('returns a 201 on successful signup', async () => {
  return await request(app)
    .post(API_ENDPOINT)
    .send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    })
    .expect(201);
});

it('returns a 400 when request has invalid email', async () => {
  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ email: INVALID_EMAIL, password: VALID_PASSWORD })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Not a valid email",
          "param": "body.email",
        },
      ],
    }
  `);
});

it('returns a 400 when request has invalid password', async () => {
  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ email: VALID_EMAIL, password: INVALID_PASSWORD })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Password must be between 8 and 20 characters",
          "param": "body.password",
        },
        {
          "message": "Password must contain at least one numeric character",
          "param": "body.password",
        },
        {
          "message": "Password must contain at least one symbol character",
          "param": "body.password",
        },
      ],
    }
  `);
});

it('returns a 400 when request is missing password', async () => {
  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ email: VALID_EMAIL })
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

it('returns a 400 when request is missing email', async () => {
  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ password: VALID_PASSWORD })
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

it('returns a 400 when request is missing email and password', async () => {
  const response = await request(app).post(API_ENDPOINT).send({}).expect(400);

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

it('returns a 400 when email is already in use', async () => {
  await request(app)
    .post(API_ENDPOINT)
    .send({ email: VALID_EMAIL, password: VALID_PASSWORD })
    .expect(201);

  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ email: VALID_EMAIL, password: VALID_PASSWORD })
    .expect(400);

  expect(response.body).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "message": "Email in use",
          },
        ],
      }
    `);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post(API_ENDPOINT)
    .send({ email: VALID_EMAIL, password: VALID_PASSWORD })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
