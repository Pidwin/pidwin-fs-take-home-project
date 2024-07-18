import sinon from 'sinon';

import auth from '../../src/utils/auth.js';

import jwt from 'jsonwebtoken';

let verifyStub;

afterEach(async () => {
  verifyStub?.restore();
});

describe('src/utils.js', () => {

  it('Catches an error', async () => {
    verifyStub = sinon.stub(jwt, 'verify').throws('badabing');

    await auth({ headers: { authorization: { split: () => 'Token '}}}, {});

    sinon.assert.calledOnce(verifyStub);
  });
});
