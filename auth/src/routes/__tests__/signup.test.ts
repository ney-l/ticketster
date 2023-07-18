import request from 'supertest';
import { app } from '@/app';

it('returns a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password1!',
    })
    .expect(201);
});
