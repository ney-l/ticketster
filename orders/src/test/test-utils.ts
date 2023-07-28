import jwt from 'jsonwebtoken';
import env from '@/environments';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { Ticket } from '@/models';

const VALID_EMAIL = 'test@test.com';

const generateJwt = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET);
};

export const getCookie = () => {
  // Generate a random object id
  const id = new mongoose.Types.ObjectId().toHexString();

  // build a JWT payload. { id, email }
  const payload = { id, email: VALID_EMAIL };

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

export const buildTicket = async () => {
  const ticket = Ticket.build({
    title: faker.lorem.words(3),
    price: Math.floor(Math.random() * 100),
  });
  await ticket.save();
  return ticket;
};
