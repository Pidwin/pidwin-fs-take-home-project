import { assert, expect } from 'chai';
import sinon from 'sinon';

import bcrypt from 'bcryptjs';

import esmResolver from '../../src/utils/esm-resolver.js';

import User from '../../src/models/user.js';
import * as changePassword from '../../src/api/user-change-password.js';

let findOne;

afterEach(async () => {
  findOne?.restore();
});

describe('src/esm-resolver.js', async () => {

  let handlerPath = `${import.meta.dirname}/../../src`;

  let route = {
    basePath: '',
    expressRoute: '/api/user/changePassword',
    openApiRoute: '/api/user/changePassword',
    method: 'POST'
  };

  let apiDoc;

  beforeEach(async () => {
    ({ default: apiDoc } = await import('../fixtures/api-doc.js'));
  });

  it('Has happy path', async () => {
    await User.create({
      email: 'user3@email.com',
      password: await bcrypt.hash('password1', 12),
      name: 'User 3',
    });

    const underTest = await esmResolver(handlerPath).resolver(handlerPath, route, apiDoc);

    const req = {
      body: {
        email: 'user3@email.com',
        oldPassword: 'password1',
        newPassword: 'password2'
      }
    };
    let lastCode;
    let lastObject;
    let lastError;
    const res = {
      status: (code) => {
        lastCode = code;
        return {
          json: (object) => {
            lastObject = object;
            return res;
          }
        };
      }
    };
    const next = (error) => {
      lastError = error;
    };

    await underTest(req, res, next);

    expect(lastCode).equals(200);
    expect(lastError).equals(undefined);
    expect(lastObject).to.include({
      name: 'User 3',
      email: 'user3@email.com'
    });
  });

  it('Catches errors inside handler function', async () => {
    findOne = sinon.stub(User, 'findOne').throws('bambam');

    const underTest = await esmResolver(handlerPath).resolver(handlerPath, route, apiDoc);

    const req = {
      body: {
        email: 'user3@email.com',
        oldPassword: 'password1',
        newPassword: 'password2'
      }
    };
    let lastCode;
    let lastObject;
    let lastError;
    const res = {
      status: (code) => {
        lastCode = code;
        return {
          json: (object) => {
            lastObject = object;
            return res;
          }
        };
      }
    };
    const next = (error) => {
      lastError = error;
    };

    try {
      await underTest(req, res, next);
      assert.fail('this line should not run');
    } catch (error) {
      expect(lastCode).equals(undefined);
      expect(lastError.message).equals('Router error: api/user-change-password.default');
      expect(lastObject).equals(undefined);
    }
  });

  it('Fails when missing handlerPath', async () => {
    try {
      await esmResolver().resolver();
      assert.fail('this line should not run');
    } catch (error) {
      expect(error.message).equals('handlerPath must be a lengthy string (undefined given)');
    }
  });

  it('Fails when missing x-eov-operation-id', async () => {
    try {
      apiDoc.paths['/api/user/changePassword'].post['x-eov-operation-id'] = undefined;
      apiDoc.paths['/api/user/changePassword'].post['x-eov-operation-handler'] = undefined;
      await esmResolver(handlerPath).resolver(handlerPath, route, apiDoc);
      assert.fail('this line should not run');
    } catch (error) {
      expect(error.message).equals('x-eov-operation-id for /api/user/changePassword (POST) must be a lengthy string (undefined given)');
    }
  });

  it('Fails when missing x-eov-operation-handler', async () => {
    try {
      apiDoc.paths['/api/user/changePassword'].post['x-eov-operation-id'] = 'default';
      apiDoc.paths['/api/user/changePassword'].post['x-eov-operation-handler'] = undefined;
      await esmResolver(handlerPath).resolver(handlerPath, route, apiDoc);
      assert.fail('this line should not run');
    } catch (error) {
      expect(error.message).equals('x-eov-operation-handler for /api/user/changePassword (POST) must be a lengthy string (undefined given)');
    }
  });

});
