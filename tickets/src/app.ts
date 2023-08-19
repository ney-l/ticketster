/**
 * Load environment variables 🌳
 */
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  attachCurrentUser,
  configureMorgan,
  errorHandler,
  loggingMiddleware,
  notFoundHandler,
} from '@ticketster/common';
import cookieSession from 'cookie-session';
import {
  createTicketRouter,
  getTicketsRouter,
  listTicketsRouter,
  updateTicketRouter,
} from '@/routes';

const app = express();

/**
 * Trust proxy 🤝
 */
app.set('trust proxy', true);

/**
 * Add middlewares 🛠
 */
app.use(json());

app.use(loggingMiddleware);
app.use(configureMorgan());

/**
 * Add cookie session middleware 🍪
 */
app.use(
  cookieSession({
    signed: false,
    secure: !['', 'development', 'test'].includes(process.env.NODE_ENV ?? ''),
  }),
);

/**
 * Attach current user middleware 🎟
 */
app.use(attachCurrentUser);

/**
 * Routes 🚏
 */
app.use(createTicketRouter);
app.use(getTicketsRouter);
app.use(listTicketsRouter);
app.use(updateTicketRouter);

/**
 * Not found route 🚧
 */
app.use(notFoundHandler);

/**
 * Global error handler 🚨
 */
app.use(errorHandler);

export { app };
