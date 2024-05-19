// This file contains the database configuration for TypeORM.
// It defines a data source that connects to a PostgreSQL database using
// the provided environment variables or default values if not found.
// It automatically synchronizes entities with the database and logs messages.
//
// To use this configuration, ensure you have the appropriate environment variables
// configured in your runtime environment.

import path from 'path';
import { DataSource } from 'typeorm';
import {
  defautlDbConfig,
  initializedDbErrorMessage,
  initializedDbMessage,
  modelsFilesRoutes
} from './databaseConstants';

const connectDB = new DataSource({
  type: defautlDbConfig.postgres,
  host: process.env.DB_HOST || defautlDbConfig.host,
  port: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : defautlDbConfig.port,
  username: process.env.DB_USER || defautlDbConfig.username,
  password: process.env.DB_PASSWORD || defautlDbConfig.password,
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, modelsFilesRoutes)]
});

const initializeDb = async () => {
  connectDB
    .initialize()
    .then(() => {
      console.log(initializedDbMessage);
    })
    .catch((err) => {
      console.error(initializedDbErrorMessage, err);
    });
};

export { connectDB, initializeDb };
