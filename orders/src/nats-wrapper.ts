import nats, { type Stan } from 'node-nats-streaming';
import env from './environments';
import { logger } from '@ticketster/common';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  /**
   * Connect to NATS
   */
  async connect() {
    try {
      await this._connect();
    } catch (error) {
      logger.error('Error connecting to NATS', error);
    }
  }

  private async _connect() {
    const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = env;
    logger.info(`NATS_CLIENT_ID: ${NATS_CLIENT_ID}`);

    this._client = nats.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, {
      url: NATS_URL,
    });

    return await new Promise<void>((resolve, reject) => {
      this._client?.on('connect', () => {
        logger.info('Connected to NATS 🎉');

        this.onClose();
        resolve();
      });
      this._client?.on('error', (err) => {
        reject(err);
      });
    });
  }

  /**
   * Configure NATS Graceful shutdown
   */
  onClose() {
    process.on('SIGINT', () => this.close());
    process.on('SIGTERM', () => this.close());

    this.client.on('close', () => {
      logger.info('NATS connection closed! Exiting process....');
      process.exit();
    });
  }

  /**
   * Close NATS connection
   */
  close() {
    this.client.close();
  }
}

/**
 * ! NATS Singleton Client
 */
export const natsWrapper = new NatsWrapper();
