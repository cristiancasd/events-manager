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
exports.TypeOrmLevelRepository = void 0;
const core_1 = require("../../../../core");
const database_1 = require("../../../../database");
const level_dto_1 = require("../models/level.dto");
class TypeOrmLevelRepository {
    constructor(commerceUseCase) {
        this.commerceUseCase = commerceUseCase;
    }
    findLevelByName(commerceId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const queryBuilder = levelRepository
                .createQueryBuilder('level')
                .where('level.commerce.id = :commerceId', { commerceId })
                .andWhere('level.name = :name', { name });
            const level = yield queryBuilder.getOne();
            if (level)
                return Object.assign(Object.assign({}, level), { commerceId });
            return null;
        });
    }
    findLevelByTypeId(commerceId, typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const queryBuilder = levelRepository
                .createQueryBuilder('level')
                .where('level.commerce.id = :commerceId', { commerceId })
                .andWhere('level.typeId = :typeId', { typeId });
            const level = yield queryBuilder.getOne();
            if (level)
                return Object.assign(Object.assign({}, level), { commerceId });
            return null;
        });
    }
    createLevel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const newLevel = levelRepository.create(data);
            const commerce = yield this.commerceUseCase.findComerceByUid(data.commerceId);
            if (commerce != null) {
                yield levelRepository.save(Object.assign(Object.assign({}, newLevel), { commerce: commerce }));
                return Object.assign(Object.assign({}, newLevel), { commerceId: commerce.id });
            }
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    deleteLevel(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const levelToDelete = yield levelRepository.findOneBy({ id: uid });
            if (levelToDelete) {
                const deleteResponse = yield levelRepository.remove(levelToDelete);
                return true;
            }
            else {
                return false;
            }
        });
    }
    findLevelByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const level = yield levelRepository.findOneBy({ id: uid });
            if (level) {
                const { commerce } = level, resto = __rest(level, ["commerce"]);
                return Object.assign(Object.assign({}, resto), { commerceId: level.commerce.id });
            }
            throw new core_1.NotFoundError(core_1.errorMessageLevelNotFound, core_1.codeLevelNotFound);
        });
    }
    findLevelsByCommerce(commerceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const levelRepository = database_1.connectDB.getRepository(level_dto_1.LevelTypeORMEntity);
            const queryBuilder = levelRepository
                .createQueryBuilder('level')
                .leftJoinAndSelect('level.commerce', 'commerce') // Carga la relación commerce
                .where('level.commerce.id = :commerceId', { commerceId });
            const levels = yield queryBuilder.getMany();
            return levels.map((data) => {
                var _a, _b;
                const { commerce } = data, resto = __rest(data, ["commerce"]);
                return Object.assign(Object.assign({}, resto), { commerceId: (_b = (_a = data.commerce) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '' });
            });
        });
    }
}
exports.TypeOrmLevelRepository = TypeOrmLevelRepository;
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "findLevelByName", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "findLevelByTypeId", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "createLevel", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "deleteLevel", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "findLevelByUid", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmLevelRepository.prototype, "findLevelsByCommerce", null);
