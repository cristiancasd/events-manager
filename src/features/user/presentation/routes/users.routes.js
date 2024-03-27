"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("../../../../core");
const config_1 = require("../../../../config");
const usersdb_middelwares_1 = require("../middelwares/usersdb.middelwares");
const users_validations_1 = require("./users.validations");
const { userCtrl } = (0, config_1.configureDependencies)();
const userRoutes = express_1.default.Router();
exports.userRoutes = userRoutes;
/// Create User
//TODO: validate not empty name
userRoutes.post(`/create`, [...users_validations_1.validateCreateUserBody, usersdb_middelwares_1.checkUserNameMiddleware], core_1.validateRequest, userCtrl.insertCtrl);
/// Find usser by UID
userRoutes.get('/find/id/:userId', [(0, core_1.validateUUIDParam)('userId')], core_1.validateRequest, userCtrl.findCtrl);
/// Find user by commerceId and levels
userRoutes.get('/find/level/:commerceId/:levelUid', [(0, core_1.validateUUIDParam)('commerceId'), (0, core_1.validateUUIDParam)('levelUid')], core_1.validateRequest, userCtrl.findUserByLevelCtrl);
/// Delete User
userRoutes.delete('/delete/:userId', [(0, core_1.validateUUIDParam)('userId')], core_1.validateRequest, userCtrl.deleteCtrl);
