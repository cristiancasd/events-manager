"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../../../../config");
const core_1 = require("../../../../core");
const auth_validations_1 = require("./auth.validations");
const { authCtrl } = (0, config_1.configureDependencies)();
const authRoutes = express_1.default.Router();
exports.authRoutes = authRoutes;
authRoutes.post(`/signin`, auth_validations_1.validateSigInBody, core_1.validateRequest, authCtrl.signInCtrl);
authRoutes.post(`/refreshtoken`, auth_validations_1.validateRefreshTokenBody, core_1.validateRequest, authCtrl.refreshTokenCtrl);
authRoutes.post(`/validatetoken`, auth_validations_1.validateTokenBody, core_1.validateRequest, authCtrl.validateTokenCtrl);
