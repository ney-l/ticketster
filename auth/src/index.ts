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
import { errorHandler, loggingMiddleware } from '@/middlewares';
import morgan from 'morgan';
import logger from './logger';
import { notFoundHandler } from './middlewares/not-found-handler';
import { connectDb } from './db';

const PORT = process.env.PORT as string;
const SERVICE_DISPLAY_NAME = process.env.SERVICE_DISPLAY_NAME as string;

/**
 * Load environment variables 🌳
 */
dotenv.config();

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
// const startServer = async () => {
//   try {
//     await connectDb();

//     app.listen(PORT, () => {
//       logger.info(`${SERVICE_DISPLAY_NAME} listening on ${PORT} ⚡️`);
//     });
//   } catch (error) {
//     logger.error(error);
//   }
// };

const startServer = () => {
  connectDb()
    .then(() => {
      app.listen(PORT, () => {
        logger.info(`${SERVICE_DISPLAY_NAME} listening on ${PORT} ⚡️`);
      });
    })
    .catch((err) => logger.error(err));
};

startServer();
