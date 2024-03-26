// start.ts
import 'dotenv/config';
import { app } from './src/app';
import { connectDB } from './src/database';

const start = async () => {
  await connectDB.initialize();
  const port = process.env.PORT || 8070;

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

start();
