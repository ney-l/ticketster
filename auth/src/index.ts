import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from '@/routes';
import { errorHandler, loggingMiddleware } from '@/middlewares';
import morgan from 'morgan';
import logger from './logger';
import { notFoundHandler } from './middlewares/not-found-handler';

const PORT = 3000;
const SERVICE_NAME = 'tk-auth-srv';
const SERVICE_DISPLAY_NAME = 'Auth Service';

const app = express();

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

/**
 * Start server 🚀
 */
app.listen(PORT, () => {
  logger.info(
    `${SERVICE_DISPLAY_NAME} listening on http://${SERVICE_NAME}:${PORT} ⚡️`,
  );
});
