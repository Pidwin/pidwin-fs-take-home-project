import { use } from 'chai';
import chaiHttp from 'chai-http';

const chai = use(chaiHttp);

const internals = {};

export const start = async () => {
  if (!internals.server) {
    const { default: server } = await import('../../index.js');
    internals.server = server;
  }

  internals.agent = internals.agent || await chai.request.agent(internals.server);
};

export const stop = async () => {
  await internals.server.close();
  await internals.agent.close();
  internals.server = undefined;
  internals.agent = undefined;
};

export default () => internals.agent;
