import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
//import addRoute from './common/infrastructure/route/add.route';
import { NotFoundError, errorHandler, errorRouteNotFound } from './core';
import router from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.all('*', async (req, res) => {
  throw new NotFoundError(errorRouteNotFound);
});

app.use(errorHandler);

export { app };
