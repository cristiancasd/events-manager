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
exports.UserUseCase = void 0;
const core_1 = require("../../../core");
const users_value_1 = require("../domain/users.value");
class UserUseCase {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    validateDuplicatedData(commerceId, document, commerceUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let documentFinded = false;
            let commerceUserIdFinded = false;
            if (document != null) {
                const userFinded = yield this._userRepository.findUserByDocument(commerceId, document.toString());
                documentFinded = userFinded ? true : false;
            }
            if (commerceUserId != null) {
                const userFinded = yield this._userRepository.findUserByDocument(commerceId, commerceUserId);
                commerceUserIdFinded = userFinded ? true : false;
            }
            return documentFinded || commerceUserIdFinded ? true : false;
        });
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValue = new users_value_1.UserValue(input);
            return yield this._userRepository.createUser(userValue);
        });
    }
    findUserByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.findUserByUid(uid);
        });
    }
    findUsersByLevelUid(commerceId, levelUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.findUsersByLevelUid(commerceId, levelUid);
        });
    }
    deleteUserByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._userRepository.deleteUser(uid);
            if (result)
                return result;
            throw new core_1.NotFoundError(core_1.errorMessageUserNotFound, core_1.codeUserNotFound);
        });
    }
}
exports.UserUseCase = UserUseCase;
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], UserUseCase.prototype, "validateDuplicatedData", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserUseCase.prototype, "createUser", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserUseCase.prototype, "findUserByUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserUseCase.prototype, "findUsersByLevelUid", null);
__decorate([
    core_1.errorHandlerUseCase,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserUseCase.prototype, "deleteUserByUid", null);
