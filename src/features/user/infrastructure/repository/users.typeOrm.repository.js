"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.TypeOrmUserRepository = void 0;
const core_1 = require("../../../../core");
const database_1 = require("../../../../database");
const users_dto_1 = require("../models/users.dto");
const bad_request_error_1 = require("../../../../core/domain/errors/bad-request-error");
const bcrypt = __importStar(require("bcrypt"));
class TypeOrmUserRepository {
    constructor(commerceUseCase, levelUseCase) {
        this.commerceUseCase = commerceUseCase;
        this.levelUseCase = levelUseCase;
    }
    findUserByDocument(commerceId, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(users_dto_1.UserTypeORMEntity);
            const documentNumber = isNaN(Number(document)) ? 0 : Number(document);
            const queryBuilder = userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.level', 'level')
                .where('user.commerce.id = :commerceId', { commerceId })
                .andWhere('(user.commerceUserId = :document OR user.document = :documentNumber)', {
                document,
                documentNumber
            });
            const user = yield queryBuilder.getOne();
            if (user)
                return Object.assign(Object.assign({}, user), { commerceId, levelUid: user.level.id });
            return null;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(users_dto_1.UserTypeORMEntity);
            const commerce = yield this.commerceUseCase.findComerceByUid(data.commerceId);
            const level = yield this.levelUseCase.findLevelByUid(data.levelUid);
            //TODO: hacer validaciones en otra parte
            //if (commerce == null) throw new BadRequestError(errorMessageCommerceNotFound, codeCommerceNotFound);
            //if (level == null || (level != null && level.commerce.id != commerce.id)) throw new BadRequestError(errorMessageLevelNotFound, codeLevelNotFound);
            if (level == null || (level != null && level.commerceId != commerce.id))
                throw new bad_request_error_1.BadRequestError(core_1.errorMessageLevelNotFound, core_1.codeLevelNotFound);
            if (data.password == null)
                throw new bad_request_error_1.BadRequestError('');
            const newUser = userRepository.create(Object.assign(Object.assign({}, data), { password: bcrypt.hashSync(data.password, 10) }));
            const algo = yield userRepository.save(Object.assign(Object.assign({}, newUser), { commerce: commerce, level: level }));
            const { password } = newUser, resto = __rest(newUser, ["password"]);
            const toSave = Object.assign(Object.assign({}, resto), { commerceId: commerce.id, levelUid: data.levelUid });
            return toSave;
        });
    }
    findUserByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(users_dto_1.UserTypeORMEntity);
            const user = yield userRepository.findOneBy({ id: uid });
            if (user) {
                const { commerce, level } = user, resto = __rest(user, ["commerce", "level"]);
                return Object.assign(Object.assign({}, resto), { commerceId: user.commerce.id, levelUid: user.level.id });
            }
            throw new core_1.NotFoundError(core_1.errorMessageUserNotFound, core_1.codeUserNotFound);
        });
    }
    findUsersByLevelUid(commerceId, levelUid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(users_dto_1.UserTypeORMEntity);
            const queryBuilder = userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.commerce', 'commerce')
                .where('user.commerce.id = :commerceId', { commerceId })
                .andWhere('user.level.id = :levelUid', { levelUid });
            const users = yield queryBuilder.getMany();
            return users.map((data) => {
                var _a, _b;
                const { commerce, level, password } = data, resto = __rest(data, ["commerce", "level", "password"]);
                return Object.assign(Object.assign({}, resto), { commerceId: data.commerce.id, levelUid: (_b = (_a = data.level) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '' });
            });
        });
    }
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(users_dto_1.UserTypeORMEntity);
            const userToDelete = yield userRepository.findOneBy({ id: uid });
            if (userToDelete) {
                const deleteResponse = yield userRepository.remove(userToDelete);
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.TypeOrmUserRepository = TypeOrmUserRepository;
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeOrmUserRepository.prototype, "findUserByDocument", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeOrmUserRepository.prototype, "createUser", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmUserRepository.prototype, "findUserByUid", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeOrmUserRepository.prototype, "findUsersByLevelUid", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmUserRepository.prototype, "deleteUser", null);
