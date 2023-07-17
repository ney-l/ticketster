import { z } from 'zod';

const EnvironmentSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  SERVICE_DISPLAY_NAME: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

const ensureEnvironment = (): Environment =>
  EnvironmentSchema.parse(process.env);

const env = ensureEnvironment();

export default env;
