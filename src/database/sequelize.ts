// Sequelize.ts
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import dbConfig from './sequalize.connection';

const sequelize = new Sequelize({
    ...dbConfig,
    models: [path.join(__dirname, '../features/**/infraestructure/models/*.model.ts')],
});

sequelize.options.logging = console.log;

export default sequelize;
