import { type UserPayload } from './types/payload';

declare global {
  namespace Express {
    export interface Request {
      currentUser?: UserPayload;
    }
  }
}

export {};
