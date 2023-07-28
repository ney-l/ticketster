import crypto from 'crypto';

const setupNatsClientId = () => {
  if (process.env.NODE_ENV === 'test' && !process.env.NATS_CLIENT_ID) {
    const randomId = crypto.randomBytes(4).toString('hex');
    const testNatsClientId = `test-nats-client-id-${randomId}`;
    process.env.NATS_CLIENT_ID = testNatsClientId;
    console.info(`Assigned a random NATS Client ID: ${testNatsClientId}`);
  }
};

export const TestHelpers = {
  setupNatsClientId,
};
