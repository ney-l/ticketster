import mongoose from 'mongoose';
import logger from './logger';
import env from './environments';

export const connectDb = async () => {
  await mongoose.connect(env.MONGODB_URI);
  logger.info('Connected to MongoDB 🔗');
};
