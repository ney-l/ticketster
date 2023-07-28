import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { TestHelpers } from '@ticketster/common';

let mongo: any;

TestHelpers.setupNatsClientId();

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});
