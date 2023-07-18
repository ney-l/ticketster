import request from 'supertest';
import { app } from '@/app';

it('returns a 201 on successful signup', async () => {
  expect(2).toBe(2);

  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password1!',
    })
    .expect(201);
});
