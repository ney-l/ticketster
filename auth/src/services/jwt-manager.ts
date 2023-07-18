import env from '@/environments';
import jwt from 'jsonwebtoken';

export const generateJwt = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET);
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};
