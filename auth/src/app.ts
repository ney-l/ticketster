import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
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
} from '@/middlewares';
import morgan from 'morgan';
import logger from './logger';
import cookieSession from 'cookie-session';

/**
 * Load environment variables 🌳
 */
dotenv.config();

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
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

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
