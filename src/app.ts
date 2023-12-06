import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
//import addRoute from './common/infrastructure/route/add.route';
import { NotFoundError } from './core/domain/errors/not-found-error';
import { errorHandler } from './core/presentation/middlewares/error-handler';
import router from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
