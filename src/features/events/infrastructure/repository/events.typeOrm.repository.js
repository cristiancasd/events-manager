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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmEventRepository = void 0;
const core_1 = require("../../../../core");
const database_1 = require("../../../../database");
const event_dto_1 = require("../models/event.dto");
const commerce_1 = require("../../../commerce");
const core_2 = require("../../../../core");
class TypeOrmEventRepository {
    findEventByName(commerceId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = database_1.connectDB.getRepository(event_dto_1.EventTypeORMEntity);
            const queryBuilder = eventRepository
                .createQueryBuilder('event')
                .where('event.commerce.id = :commerceId', { commerceId })
                .andWhere('event.name = :name', { name });
            const event = yield queryBuilder.getOne();
            if (event)
                return Object.assign(Object.assign({}, event), { commerceId });
            return null;
        });
    }
    createEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = database_1.connectDB.getRepository(event_dto_1.EventTypeORMEntity);
            const commerceRepository = database_1.connectDB.getRepository(commerce_1.CommerceTypeORMEntity);
            const newEvent = eventRepository.create(data);
            const commerce = yield commerceRepository.findOneBy({
                id: data.commerceId
            });
            if (commerce != null) {
                const algo = new Date(data.date);
                //TODO: add a validation to Date type
                if (isNaN(algo.getTime()))
                    throw new core_2.BadRequestError('Invalid date');
                yield eventRepository.save(Object.assign(Object.assign({}, newEvent), { commerce: commerce }));
                return Object.assign(Object.assign({}, newEvent), { commerceId: commerce.id });
            }
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    deleteEvent(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = database_1.connectDB.getRepository(event_dto_1.EventTypeORMEntity);
            const eventToDelete = yield eventRepository.findOneBy({ id: uid });
            if (eventToDelete) {
                const deleteResponse = yield eventRepository.remove(eventToDelete);
                return true;
            }
            else {
                return false;
            }
        });
    }
    findEventById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = database_1.connectDB.getRepository(event_dto_1.EventTypeORMEntity);
            const event = yield eventRepository.findOneBy({ id: uid });
            if (event) {
                const { commerce } = event, resto = __rest(event, ["commerce"]);
                return Object.assign(Object.assign({}, resto), { commerceId: event.commerce.id });
            }
            throw new core_1.NotFoundError(core_2.errorMessageEventNotFound, core_2.codeEventNotFound);
        });
    }
    findEventsByCommerce(commerceId, startDate, finishDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = database_1.connectDB.getRepository(event_dto_1.EventTypeORMEntity);
            const queryBuilder = eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.commerce', 'commerce') // Carga la relación commerce
                .where('event.commerce.id = :commerceId', { commerceId });
            if (startDate && finishDate) {
                // Caso 3: Si viene ambas fechas entonces traer los eventos creados en dicha fecha
                queryBuilder.andWhere('event.date BETWEEN :startDate AND :finishDate', {
                    startDate,
                    finishDate
                });
            }
            else if (startDate) {
                // Caso 1: Si viene solo start date, entonces buscar todos los eventos desde la fecha inicial dada
                queryBuilder.andWhere('event.date >= :startDate', { startDate });
            }
            else if (finishDate) {
                // Caso 2: Si viene solo finish date, traer todos los datos hasta la fecha final
                queryBuilder.andWhere('event.date <= :finishDate', { finishDate });
            }
            const events = yield queryBuilder.getMany();
            const algo = events.map((data) => {
                var _a, _b;
                const { commerce } = data, resto = __rest(data, ["commerce"]);
                return Object.assign(Object.assign({}, resto), { commerceId: (_b = (_a = data.commerce) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '' });
            });
            return algo;
        });
    }
}
exports.TypeOrmEventRepository = TypeOrmEventRepository;
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeOrmEventRepository.prototype, "findEventByName", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeOrmEventRepository.prototype, "createEvent", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmEventRepository.prototype, "deleteEvent", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmEventRepository.prototype, "findEventById", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date]),
    __metadata("design:returntype", Promise)
], TypeOrmEventRepository.prototype, "findEventsByCommerce", null);
