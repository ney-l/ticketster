import { app } from '@/app';
import { getCookie } from '@/test/test-utils';
import request from 'supertest';

const CURRENT_USER_API_ENDPOINT = '/api/users/current';

it('responds with current user details', async () => {
  const { cookie, email } = await getCookie();

  const response = await request(app)
    .get(CURRENT_USER_API_ENDPOINT)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toBe(email);
  expect(response.body.currentUser.id).toBeDefined();
});

it('responds with 400 if not authenticated', async () => {
  const response = await request(app)
    .get(CURRENT_USER_API_ENDPOINT)
    .send()
    .expect(400);

  expect(response.body.currentUser).toBeUndefined();
  expect(response.body).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Missing Authentication Token.",
        },
      ],
    }
  `);
});
