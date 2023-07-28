import crypto from 'crypto';

const generateRandomNatsClientId = () => {
  const randomId = crypto.randomBytes(4).toString('hex');
  const testNatsClientId = `test-nats-client-id-${randomId}`;
  return testNatsClientId;
};

/**
 * Sets up a random NATS Client ID in the test environment for testing purposes.
 */
const setupNatsClientId = (id?: string) => {
  if (process.env.NODE_ENV === 'test' && !process.env.NATS_CLIENT_ID) {
    const testNatsClientId = id ?? generateRandomNatsClientId();
    process.env.NATS_CLIENT_ID = testNatsClientId;
    console.info(`Assigned a random NATS Client ID: ${testNatsClientId}`);
  }
};

export const TestHelpers = {
  setupNatsClientId,
  generateRandomNatsClientId,
};
