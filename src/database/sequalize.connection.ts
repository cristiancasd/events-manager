import { Sequelize } from 'sequelize-typescript';
import { SequelizeOptions } from 'sequelize-typescript';



const dbConfigSequealize: SequelizeOptions = {

  database: 'postgres',
  username: process.env.DB_USER || 'tu_usuario',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  host: process.env.DB_HOST || 'tu_host',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dialect: 'postgres',
  storage: ':memory:',
};

export default dbConfigSequealize;
