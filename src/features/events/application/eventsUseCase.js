"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.EventsUseCase = void 0;
const core_1 = require("../../../core");
const core_2 = require("../../../core");
const event_value_1 = require("../domain/event.value");
class EventsUseCase {
    constructor(_eventsRepository) {
        this._eventsRepository = _eventsRepository;
    }
    validateDuplicatedData(commerceId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._eventsRepository.findEventByName(commerceId, data);
            return result ? true : false;
        });
    }
    createEvent(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventValue = new event_value_1.EventValue(input);
            return yield this._eventsRepository.createEvent(eventValue);
        });
    }
    deleteEventByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._eventsRepository.deleteEvent(uid);
            if (result)
                return result;
            throw new core_1.NotFoundError(core_2.errorMessageEventNotFound, core_2.codeEventNotFound);
        });
    }
    findEventByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._eventsRepository.findEventById(uid);
        });
    }
    findEventsByCommerce(commerceId, startDate, finishDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let startDateTime = startDate ? new Date(startDate) : undefined;
            let finishDateTime = finishDate ? new Date(finishDate) : undefined;
            if ((startDateTime && isNaN(startDateTime.getTime())) || !startDateTime)
                startDateTime = undefined;
            if ((finishDateTime && isNaN(finishDateTime.getTime())) || !finishDateTime)
                finishDateTime = undefined;
            return yield this._eventsRepository.findEventsByCommerce(commerceId, startDateTime, finishDateTime);
        });
    }
}
exports.EventsUseCase = EventsUseCase;
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventsUseCase.prototype, "validateDuplicatedData", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsUseCase.prototype, "createEvent", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsUseCase.prototype, "deleteEventByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsUseCase.prototype, "findEventByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EventsUseCase.prototype, "findEventsByCommerce", null);
