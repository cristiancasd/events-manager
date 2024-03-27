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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
const core_1 = require("../../../../core");
const database_1 = require("../../../../database");
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../../../user");
const userAuth_value_1 = require("../../domain/userAuth.value");
const users_value_1 = require("../../../user/domain/users.value");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_value_1 = require("../../domain/auth.value");
class AuthRepositoryImpl {
    constructor(tokenSecretKey = process.env.TOKEN_SECRET_KEY || '', refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY || '') {
        this.tokenSecretKey = tokenSecretKey;
        this.refreshTokenSecretKey = refreshTokenSecretKey;
    }
    validateCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.connectDB.getRepository(user_1.UserTypeORMEntity);
            const user = yield userRepository.findOne({
                where: { email }, select: { email: true, password: true, id: true },
            });
            if (!user)
                throw new core_1.NotFoundError(core_1.errorMessageUserNotFound, core_1.codeUserNotFound);
            if (!bcrypt.compareSync(password, user.password)) {
                const userEntity = new users_value_1.UserValue(Object.assign(Object.assign({}, user), { commerceId: '', levelUid: '' }));
                return new userAuth_value_1.UserAuthValue({
                    userUid: userEntity.id,
                    role: userEntity.role,
                    isActive: userEntity.isActive
                });
            }
            throw new core_1.UnauthorizedError;
        });
    }
    generateToken(userAuthInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(userAuthInfo, this.tokenSecretKey, { expiresIn: '1h' });
            const refreshToken = jsonwebtoken_1.default.sign(userAuthInfo, this.refreshTokenSecretKey, { expiresIn: '7d' });
            return new auth_value_1.AuthValue({
                token: token,
                refreshToken: refreshToken,
            });
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, this.refreshTokenSecretKey);
            const userTokenData = new userAuth_value_1.UserAuthValue({
                isActive: decoded.isActive,
                role: decoded.role,
                userUid: decoded.userUid,
            });
            return yield this.generateToken(userTokenData);
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, this.refreshTokenSecretKey);
            return true;
        });
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthRepositoryImpl.prototype, "validateCredentials", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthRepositoryImpl.prototype, "generateToken", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthRepositoryImpl.prototype, "refreshToken", null);
__decorate([
    core_1.errorHandlerTypeOrm,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthRepositoryImpl.prototype, "validateToken", null);
