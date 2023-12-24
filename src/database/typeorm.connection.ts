// ormconfig.ts
import path from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';

const connectDB = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || 'tu_host',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER || 'tu_usuario',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '../features/**/infrastructure/models/*.dto.ts')]
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  })

export { connectDB };
