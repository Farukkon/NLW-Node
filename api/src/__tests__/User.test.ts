import request from 'supertest';
import app from '../app';
import createConnection from '../database/index';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users')
      .send({
        email: 'user@example.com',
        name: 'User Example',
      });
    expect(response.status).toBe(201);
  });

  it('Should not be able to create an user if his email already exists', async () => {
    const response = await request(app).post('/users')
      .send({
        email: 'user@example.com',
        name: 'User Example',
      });
    expect(response.status).toBe(400);
  });
});