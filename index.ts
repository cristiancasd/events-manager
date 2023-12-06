// start.ts
import 'dotenv/config';
import { app } from './src/app';
import sequelize from './src/database/sequelize';
import dbConfig from './src/database/sequalize.connection';
import dbConfigOrm from './src/database/typeorm.connection';
import connectDB from './src/database/typeorm.connection';

const start = async () => {


  await connectDB.initialize();


  const port = process.env.PORT || 8070;

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

start();
