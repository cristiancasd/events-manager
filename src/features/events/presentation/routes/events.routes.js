"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("../../../../core");
const config_1 = require("../../../../config");
const db_middelwares_1 = require("../middelwares/db.middelwares");
const events_validations_1 = require("./events.validations");
const { eventsCtrl } = (0, config_1.configureDependencies)();
const eventsRoutes = express_1.default.Router();
exports.eventsRoutes = eventsRoutes;
/// Create Event
//TODO: validate not empty name
eventsRoutes.post(`/create`, [...events_validations_1.validateCreateEventBody, db_middelwares_1.checkEventNameMiddleware], core_1.validateRequest, eventsCtrl.insertCtrl);
/// Delete Event
eventsRoutes.delete('/delete/:eventId', [(0, core_1.validateUUIDParam)('eventId')], core_1.validateRequest, eventsCtrl.deleteCtrl);
/// Find commerce by UID
eventsRoutes.get('/find/id/:eventId', [(0, core_1.validateUUIDParam)('eventId')], core_1.validateRequest, eventsCtrl.findCtrl);
/// Find event by commerceId and dates
eventsRoutes.get('/find/commerce/:commerceId', events_validations_1.validateFindEvents, core_1.validateRequest, eventsCtrl.findEventsByCommerceCtrl);
