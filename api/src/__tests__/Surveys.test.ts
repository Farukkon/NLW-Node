import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../app';
import createConnection from '../database/index';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys')
      .send({
        title: 'Title Example',
        description: 'Description Example',
      });
    expect(response.status).toBe(201);
  });

  it('Should be able to show all surveys', async () => {
    await request(app).post('/surveys')
      .send({
        title: 'Title Example',
        description: 'Description Example',
      });

    const response = await request(app).get('/surveys');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
});
