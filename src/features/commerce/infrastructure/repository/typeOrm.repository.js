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
exports.TypeOrmCommerceRepository = void 0;
const core_1 = require("../../../../core");
const __1 = require("..");
const database_1 = require("../../../../database");
class TypeOrmCommerceRepository {
    findCommerceById(uid, onlyAcitve) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const commerce = yield commerceRepository.findOneBy({ id: uid });
            if (commerce) {
                if (onlyAcitve == true) {
                    if (commerce.isActive) {
                        return commerce;
                    }
                    else {
                        throw new core_1.InactiveDataError();
                    }
                }
            }
            if (commerce)
                return commerce;
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    createCommerce(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const newCommerce = commerceRepository.create(data);
            yield commerceRepository.save(newCommerce);
            return newCommerce;
        });
    }
    deleteCommerce(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const commerceToDelete = yield commerceRepository.findOneBy({ id: uid });
            if (commerceToDelete) {
                const deleteResponse = yield commerceRepository.remove(commerceToDelete);
                return true;
            }
            else {
                return false;
            }
        });
    }
    disableCommerce(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const commerce = yield commerceRepository.findOneBy({ id: uid });
            if (commerce) {
                commerce.isActive = false;
                yield commerceRepository.save(commerce);
                return true;
            }
            else {
                return false;
            }
        });
    }
    enableCommerce(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const commerce = yield commerceRepository.findOneBy({ id: uid });
            if (commerce) {
                commerce.isActive = true;
                yield commerceRepository.save(commerce);
                return true;
            }
            else {
                return false;
            }
        });
    }
    findCommerces(status, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            const conditions = {};
            if (status !== null && status !== undefined) {
                conditions.where = Object.assign(Object.assign({}, conditions.where), { isActive: status == core_1.CriteriaOptionsStatus.active });
            }
            if (location !== null && location !== undefined) {
                if (location.type == core_1.CriteriaOptionsLocation.city) {
                    conditions.where = Object.assign(Object.assign({}, conditions.where), { city: location.name });
                }
                else {
                    conditions.where = Object.assign(Object.assign({}, conditions.where), { countryCode: location.name });
                }
            }
            return yield commerceRepository.find(conditions);
        });
    }
    findByUniqueColumn(option, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceRepository = database_1.connectDB.getRepository(__1.CommerceTypeORMEntity);
            if (option == core_1.OptionsValidations.name) {
                const result = yield commerceRepository.find({ where: { name: data } });
                if (result.length > 0) {
                    return result[0];
                }
            }
            if (option == core_1.OptionsValidations.phone) {
                const result = yield commerceRepository.find({ where: { phone: +data } });
                if (result.length > 0) {
                    return result[0];
                }
            }
            if (option == core_1.OptionsValidations.email) {
                const result = yield commerceRepository.find({ where: { email: data } });
                if (result.length > 0) {
                    return result[0];
                }
            }
            throw new core_1.DataBaseError('', core_1.codeDbError);
        });
    }
}
exports.TypeOrmCommerceRepository = TypeOrmCommerceRepository;
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "findCommerceById", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "createCommerce", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "deleteCommerce", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "disableCommerce", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "enableCommerce", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "findCommerces", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TypeOrmCommerceRepository.prototype, "findByUniqueColumn", null);
