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

  async connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return await new Promise<void>((resolve, reject) => {
      this._client?.on('connect', () => {
        logger.info('Connected to NATS 🎉');
        resolve();
      });
      this._client?.on('error', (err) => {
        reject(err);
      });
    });
  }
}

/**
 * NATS Singleton Client
 */
export const natsWrapper = new NatsWrapper();

export const connectNats = async () => {
  const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = env;
  logger.info(`NATS_CLIENT_ID: ${NATS_CLIENT_ID}`);

  await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
};
