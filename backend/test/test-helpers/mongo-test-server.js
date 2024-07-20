import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const internals = {};

export const start = async () => {
  if (!internals.mongoServer) {
    internals.mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(internals.mongoServer.getUri());
  }
};

export const stop = async () => {
  await mongoose.disconnect();
  await internals.mongoServer.stop();
  internals.mongoServer = undefined;
};
