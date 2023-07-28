import logger from '@/logger';
import { z } from 'zod';

const EnvironmentSchema = z.object({
  JWT_SECRET: z.string(),
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
