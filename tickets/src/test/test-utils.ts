import jwt from 'jsonwebtoken';
import env from '@/environments';

const VALID_EMAIL = 'test@test.com';
const RANDOM_ID = '1234';

const generateJwt = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET);
};

export const getCookie = () => {
  // build a JWT payload. { id, email }
  const payload = { id: RANDOM_ID, email: VALID_EMAIL };

  // create the JWT
  const token = generateJwt(payload);

  // Build session object { jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that is the cookie with the encoded data
  return [`session=${base64}`];
};
