/**
 * Load environment variables 🌳
 */
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from '@/routes';
import {
  errorHandler,
  loggingMiddleware,
  notFoundHandler,
  configureMorgan,
} from '@ticketster/common';
import cookieSession from 'cookie-session';

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
 * Routes 🚏
 */
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/**
 * Not found route 🚧
 */
app.use(notFoundHandler);

/**
 * Global error handler 🚨
 */
app.use(errorHandler);

export { app };
