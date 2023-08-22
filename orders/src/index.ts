import { logger } from '@ticketster/common';
import { app } from '@/app';
import { connectDb } from '@/db';
import env from '@/environments';
import { connectNats, natsWrapper } from '@/nats-wrapper';
import { TicketCreatedListener, TicketUpdatedListener } from '@/events';

/**
 * Connect to NATS and DB and start the server 🚀
 */
const startServer = async () => {
  /**
   * Connect to NATS
   */
  await connectNats();

  /**
   * NATS Graceful shutdown
   */
  natsWrapper.close();

  /**
   * 📡 Listen to events: TicketCreatedEvent and TicketUpdatedEvent
   */
  new TicketCreatedListener(natsWrapper.client).listen();
  new TicketUpdatedListener(natsWrapper.client).listen();

  /**
   * Connect to DB
   */
  await connectDb();

  const { PORT, SERVICE_DISPLAY_NAME } = env;

  /**
   * Start the server
   */
  app.listen(PORT, () => {
    logger.info(`${SERVICE_DISPLAY_NAME} listening on ${PORT} ⚡️`);
  });
};

startServer().catch((err) => {
  logger.error(err);
  logger.error(err.stack);
});
