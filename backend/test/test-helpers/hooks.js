import * as express from './express-test-server.js';
import * as mongo from './mongo-test-server.js';

export const mochaHooks = {
  async beforeAll() {
    await express.start();
    await mongo.start();
  },
  async afterAll() {
    await express.stop();
    await mongo.stop();
  }
};
