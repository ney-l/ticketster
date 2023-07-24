import request from 'supertest';
import { app } from '@/app';

const API_ENDPOINT = '/api/users/signup';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'password1!';

export const getCookie = async () => {
  const user = { email: VALID_EMAIL, password: VALID_PASSWORD };
  const response = await request(app).post(API_ENDPOINT).send(user).expect(201);

  const cookie = response.get('Set-Cookie');

  return { cookie, ...user };
};
