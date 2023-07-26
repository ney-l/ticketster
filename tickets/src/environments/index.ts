import { logger } from '@ticketster/common';
import { z } from 'zod';

const EnvironmentSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  SERVICE_DISPLAY_NAME: z.string(),
  JWT_SECRET: z.string(),
  NATS_CLUSTER_ID: z.string(),
  NATS_CLIENT_ID: z.string(),
  NATS_URL: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

const ensureEnvironment = (): Environment => {
  try {
    return EnvironmentSchema.parse(process.env);
  } catch (err) {
    logger.error('Environment variables are not valid');
    throw err;
  }
};

const env = ensureEnvironment();

export default env;
