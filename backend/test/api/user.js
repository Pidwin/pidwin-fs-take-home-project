import { expect } from 'chai';
import sinon from 'sinon';

import agent from '../test-helpers/express-test-server.js';

import User from "../../src/models/user.js";

let token, findOneStub;

afterEach(async () => {
  findOneStub?.restore();
});

describe('POST /api/user/signup', () => {

  it('Creates a user', async () => {
    const response = await agent().post('/api/user/signup')
      .send({
        firstName: 'User 1',
        lastName: '',
        email: 'user1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      });

    token = JSON.parse(response.text).token;

    expect(response.status).to.equal(200);
    expect(response.text).to.contain('{"token":');
  });

  it('Fails to create user when duplicate exists', async () => {
    const response = await agent().post('/api/user/signup')
      .send({
        firstName: 'User 1',
        lastName: '',
        email: 'user1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      });

    expect(response.status).to.equal(400);
    expect(response.text).to.contain('{"message":"User Already Exist"}');
  });

  it('Fails to create user when confirmPassword does not match', async () => {
    const response = await agent().post('/api/user/signup')
      .send({
        firstName: 'User 2',
        lastName: '',
        email: 'user2@email.com',
        password: 'password1',
        confirmPassword: '1password',
      });

    expect(response.status).to.equal(400);
    expect(response.text).to.contain('{"message":"Password Does Not Match"}');
  });

  it('Catches errors', async () => {
    findOneStub = sinon.stub(User, 'findOne').throws('bambam');

    const response = await agent().post('/api/user/signup')
      .send({
        firstName: 'User 2',
        lastName: '',
        email: 'user2@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      });

    expect(response.status).to.equal(500);
    expect(response.text).to.contain('{"message":"Something went wrong"}');
  });
});

describe('POST /api/user/changePassword', () => {

  it('Changes a users password', async () => {
    const response = await agent().post('/api/user/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email: 'user1@email.com',
        oldPassword: 'password1',
        newPassword: 'password2',
      });

    expect(response.status).to.equal(200);
    expect(response.text).to.contain('{"_id":"');
  });

  it('Fails to change password when user does not exist', async () => {
    const response = await agent().post('/api/user/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email: 'user2@email.com',
        oldPassword: 'password1',
        newPassword: 'password2',
      });

    expect(response.status).to.equal(404);
    expect(response.text).to.contain('{"message":"User Does Not Exist"}');
  });

  it('Fails to change password when user not authenticated', async () => {
    const response = await agent().post('/api/user/changePassword')
      .set({ Authorization: 'Bearer ' })
      .send({
        email: 'user1@email.com',
        oldPassword: 'password2',
        newPassword: 'password3',
      });

    expect(response.status).to.equal(401);
    expect(JSON.parse(response.text)).to.contain({ message: 'unauthorized' });
  });

  it('Fails to change password when invalid password', async () => {
    const response = await agent().post('/api/user/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email: 'user1@email.com',
        oldPassword: 'password1',
        newPassword: 'password2',
      });

    expect(response.status).to.equal(400);
    expect(response.text).to.contain('{"message":"Invalid Password"}');
  });

  it('Catches errors', async () => {
    findOneStub = sinon.stub(User, 'findOne').throws('bambam');

    const response = await agent().post('/api/user/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email: 'user1@email.com',
        oldPassword: 'password2',
        newPassword: 'password3',
      });

    expect(response.status).to.equal(500);
    expect(response.text).to.contain('{"message":"Something went wrong"}');
  });
});

describe('POST /api/user/login', () => {

  it('Logs in a user', async () => {
    const response = await agent().post('/api/user/login')
      .send({
        email: 'user1@email.com',
        password: 'password2',
      });

    expect(response.status).to.equal(200);
    expect(response.text).to.contain('{"token":');
  });

  it('Fails to login when does not exist', async () => {
    const response = await agent().post('/api/user/login')
      .send({
        email: 'user2@email.com',
        password: 'password1',
      });

    expect(response.status).to.equal(404);
    expect(response.text).to.contain('{"message":"User Does Not Exist"}');
  });

  it('Fails to login when invalid password', async () => {
    const response = await agent().post('/api/user/login')
      .send({
        email: 'user1@email.com',
        password: 'password3',
      });

    expect(response.status).to.equal(400);
    expect(response.text).to.contain('{"message":"Invalid Password"}');
  });

  it('Catches errors', async () => {
    findOneStub = sinon.stub(User, 'findOne').throws('bambam');

    const response = await agent().post('/api/user/login')
      .send({
        email: 'user1@email.com',
        password: 'password2',
      });

    expect(response.status).to.equal(500);
    expect(response.text).to.contain('{"message":"Something went wrong"}');
  });
});
