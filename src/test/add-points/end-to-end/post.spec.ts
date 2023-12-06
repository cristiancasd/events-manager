import { app } from '../../../app';

import request from 'supertest';
import {
  connectProducer,
  disconnectProducer
} from '../../../add-points/infrastructure/broker/kafka';

beforeAll(async () => {
  await connectProducer();
});

afterAll(async () => {
  // await disconnectProducer();
});

//jest.useFakeTimers()

const data = {
  documentCc: 455554,
  name: 'post End to End',
  points: 54,
  detail: 'puntos por comprar X product',
  idUser: 'a9e2c4a3-403b-42a1-a716-af09c3cf1e70' // random User to test
};

const dataErr = {
  d: 455554, //body must have "documentCc"
  n: 'post End to End', //body must have "name"
  points: '55lf4', //points must be number
  de: 'fsdf', //body must have "detail"
  idUser: 455455 // idUser, must be UUID
};

describe('CREATE ADD-POINTS - POST /add/create', () => {
  it('should respond with a 201 status code', async () => {
    const response = await request(app).post('/api/add/create').send(data);
    expect(response.statusCode).toBe(201);
  });

  it('response should do match with data object', async () => {
    const response = await request(app).post('/api/add/create').send(data);
    expect(response.body).toBeDefined();
    expect(response.body).toMatchObject(data);
  });

  it('bad data- should respond with a 400 status code', async () => {
    const response = await request(app).post('/api/add/create').send(dataErr);
    expect(response.statusCode).toBe(400);
  });

  it('bad data- should have 5 errors description', async () => {
    const response = await request(app).post('/api/add/create').send(dataErr);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors.length).toEqual(5);
  });
});
