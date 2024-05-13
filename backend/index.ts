// start.ts
import 'dotenv/config';
import { app } from './src/app';
import { initializeDb } from './src/database';

const start = async () => {
  await initializeDb();
  const port = process.env.PORT || 8070;

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

start();
