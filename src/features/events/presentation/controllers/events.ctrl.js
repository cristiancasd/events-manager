"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
class EventsController {
    constructor(eventsUseCase) {
        this.eventsUseCase = eventsUseCase;
        this.insertCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const event = yield this.eventsUseCase.createEvent(body);
            res.status(201).send(event);
        });
        this.deleteCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            const result = yield this.eventsUseCase.deleteEventByUid(eventId);
            res.status(200).send(result);
        });
        this.findCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            const result = yield this.eventsUseCase.findEventByUid(eventId);
            res.status(200).send(result);
        });
        this.findEventsByCommerceCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { commerceId } = req.params;
            const { startDate, finishDate } = req.query;
            const result = yield this.eventsUseCase.findEventsByCommerce(commerceId, startDate, finishDate);
            res.status(200).send(result);
        });
    }
}
exports.EventsController = EventsController;