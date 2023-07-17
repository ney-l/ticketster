import mongoose from 'mongoose';
import logger from './logger';

export const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  logger.info('Connected to MongoDB 🔗');
};
