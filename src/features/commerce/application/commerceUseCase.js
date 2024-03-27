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
exports.CommerceUseCase = void 0;
const core_1 = require("../../../core");
const domain_1 = require("../domain");
class CommerceUseCase {
    constructor(_commerceRepository) {
        this._commerceRepository = _commerceRepository;
    }
    validateDuplicatedData(option, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._commerceRepository.findByUniqueColumn(option, data);
            return result ? true : false;
        });
    }
    createCommerce(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const commerceValue = new domain_1.CommerceValue(input);
            return yield this._commerceRepository.createCommerce(commerceValue);
        });
    }
    deleteCommerceByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._commerceRepository.deleteCommerce(uid);
            if (result)
                return result;
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    disableCommerceByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._commerceRepository.disableCommerce(uid);
            if (result)
                return result;
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    enableCommerceByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._commerceRepository.enableCommerce(uid);
            if (result)
                return result;
            throw new core_1.NotFoundError(core_1.errorMessageCommerceNotFound, core_1.codeCommerceNotFound);
        });
    }
    findComerceByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._commerceRepository.findCommerceById(uid);
        });
    }
    findCommerces(status, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._commerceRepository.findCommerces(status, location);
        });
    }
}
exports.CommerceUseCase = CommerceUseCase;
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "validateDuplicatedData", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "createCommerce", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "deleteCommerceByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "disableCommerceByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "enableCommerceByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "findComerceByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommerceUseCase.prototype, "findCommerces", null);
