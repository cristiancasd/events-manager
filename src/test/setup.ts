import 'dotenv/config';
import { connectDB } from '../database';

// Mock de la función connectDB.initialize()
jest.mock('../database', () => ({
  connectDB: {
    initialize: jest.fn()
  }
}));

beforeAll(async () => {
  //await connectDB.initialize();
});
