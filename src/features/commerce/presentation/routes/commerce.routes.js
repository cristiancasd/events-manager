"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commerceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("../../../../core");
const db_middelwares_1 = require("../middelwares/db.middelwares");
const config_1 = require("../../../../config");
const commerce_validations_1 = require("./commerce.validations");
const { commerceCtrl } = (0, config_1.configureDependencies)();
const commerceRoutes = express_1.default.Router();
exports.commerceRoutes = commerceRoutes;
/// Create Commerce
//TODO: validate not empty name
commerceRoutes.post(`/create`, [
    ...commerce_validations_1.validateCreateCommerceBody,
    db_middelwares_1.checkCommerceNameMiddleware,
    db_middelwares_1.checkCommerceEmailMiddleware,
    db_middelwares_1.checkCommercePhoneMiddleware
], core_1.validateRequest, commerceCtrl.insertCtrl);
/// Delete Commerce
commerceRoutes.delete('/delete/:idCommerce', [(0, core_1.validateUUIDParam)('idCommerce')], core_1.validateRequest, commerceCtrl.deleteCtrl);
/// disable Commerce
commerceRoutes.delete('/disable/:idCommerce', [(0, core_1.validateUUIDParam)('idCommerce')], core_1.validateRequest, commerceCtrl.disableCtrl);
/// Enable commerce
commerceRoutes.put('/enable/:idCommerce', [(0, core_1.validateUUIDParam)('idCommerce')], core_1.validateRequest, commerceCtrl.enableCtrl);
/// Find commerce by UID
commerceRoutes.get('/find/id/:idCommerce', [(0, core_1.validateUUIDParam)('idCommerce')], core_1.validateRequest, commerceCtrl.findCtrl);
/// Find commerce by Criteria
commerceRoutes.get('/find/all', [...commerce_validations_1.validateFindAllEvents, commerce_validations_1.checkBothLocationTypeAndLocation], core_1.validateRequest, commerceCtrl.findByCriteriaCtrl);
