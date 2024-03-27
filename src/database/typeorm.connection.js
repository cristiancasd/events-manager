"use strict";
// This file contains the database configuration for TypeORM.
// It defines a data source that connects to a PostgreSQL database using
// the provided environment variables or default values if not found.
// It automatically synchronizes entities with the database and logs messages.
//
// To use this configuration, ensure you have the appropriate environment variables
// configured in your runtime environment.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const databaseConstants_1 = require("./databaseConstants");
const connectDB = new typeorm_1.DataSource({
    type: databaseConstants_1.defautlDbConfig.postgres,
    host: process.env.DB_HOST || databaseConstants_1.defautlDbConfig.host,
    port: process.env.DB_PORT
        ? parseInt(process.env.DB_PORT, 10)
        : databaseConstants_1.defautlDbConfig.port,
    username: process.env.DB_USER || databaseConstants_1.defautlDbConfig.username,
    password: process.env.DB_PASSWORD || databaseConstants_1.defautlDbConfig.password,
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [path_1.default.join(__dirname, databaseConstants_1.modelsFilesRoutes)]
});
exports.connectDB = connectDB;
connectDB
    .initialize()
    .then(() => {
    console.log(databaseConstants_1.initializedDbMessage);
})
    .catch((err) => {
    console.error(databaseConstants_1.initializedDbErrorMessage, err);
});
