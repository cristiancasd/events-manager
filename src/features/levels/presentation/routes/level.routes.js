"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
const core_1 = require("../../../../core");
const config_1 = require("../../../../config");
const db_middelwares_1 = require("../middelwares/db.middelwares");
const level_validations_1 = require("./level.validations");
const { levelCtrl } = (0, config_1.configureDependencies)();
const levelRoutes = express_1.default.Router();
exports.levelRoutes = levelRoutes;
/// Create Level
//TODO: validate not empty name
levelRoutes.post(`/create`, [...level_validations_1.validateCreateLevelBody, db_middelwares_1.checkLevelNameMiddleware], core_1.validateRequest, levelCtrl.insertCtrl);
/// Delete Level
levelRoutes.delete('/delete/:levelId', [(0, core_1.validateUUIDParam)('levelId')], core_1.validateRequest, levelCtrl.deleteCtrl);
/// Find commerce by UID
levelRoutes.get('/find/id/:levelId', [(0, core_1.validateUUIDParam)('levelId')], core_1.validateRequest, levelCtrl.findCtrl);
/// Find level by commerceId and dates
levelRoutes.get('/find/commerce/:commerceId', core_1.validateRequest, levelCtrl.findLevelByCommerceCtrl);
