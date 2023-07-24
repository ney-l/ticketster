import { logger } from '@ticketster/common';
import { app } from './app';
import { connectDb } from './db';
import env from './environments';

/**
 * Connect to DB and start the server 🚀
 */
const startServer = () => {
  connectDb()
    .then(() => {
      const { PORT, SERVICE_DISPLAY_NAME } = env;

      app.listen(PORT, () => {
        logger.info(`${SERVICE_DISPLAY_NAME} listening on ${PORT} ⚡️`);
      });
    })
    .catch((err) => logger.error(err));
};

startServer();
