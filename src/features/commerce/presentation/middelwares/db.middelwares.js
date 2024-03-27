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
exports.checkCommerceEmailMiddleware = exports.checkCommercePhoneMiddleware = exports.checkCommerceNameMiddleware = void 0;
const core_1 = require("../../../../core");
const express_validator_1 = require("express-validator");
const config_1 = require("../../../../config");
const { commerceUseCase } = (0, config_1.configureDependencies)();
const checkCommerceNameMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const nameExist = yield commerceUseCase.validateDuplicatedData(core_1.OptionsValidations.name, name);
            if (nameExist)
                throw new core_1.DataBaseError(core_1.duplicatedEmailMessage, core_1.codeDbNameDuplicated);
        }
        catch (err) {
            if (err instanceof core_1.CustomError) {
                if (err instanceof core_1.DataBaseError) {
                    if (err.code == core_1.codeDbError)
                        return next();
                }
                throw err;
            }
            throw new core_1.ServerError();
        }
    }
    next();
});
exports.checkCommerceNameMiddleware = checkCommerceNameMiddleware;
const checkCommercePhoneMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const phoneExist = yield commerceUseCase.validateDuplicatedData(core_1.OptionsValidations.phone, phone);
            if (phoneExist)
                throw new core_1.DataBaseError(core_1.duplicatedPhoneMessage, core_1.codeDbPhoneDuplicated);
        }
        catch (err) {
            if (err instanceof core_1.CustomError) {
                if (err instanceof core_1.DataBaseError) {
                    if (err.code == core_1.codeDbError)
                        return next();
                }
                throw err;
            }
            throw new core_1.ServerError();
        }
    }
    next();
});
exports.checkCommercePhoneMiddleware = checkCommercePhoneMiddleware;
const checkCommerceEmailMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const emailExist = yield commerceUseCase.validateDuplicatedData(core_1.OptionsValidations.email, email);
            if (emailExist) {
                throw new core_1.DataBaseError('Duplicated Email', core_1.codeDbEmailDuplicated);
            }
        }
        catch (err) {
            if (err instanceof core_1.CustomError) {
                if (err instanceof core_1.DataBaseError) {
                    if (err.code == core_1.codeDbError)
                        return next();
                }
                throw err;
            }
            throw new core_1.ServerError();
        }
    }
    next();
});
exports.checkCommerceEmailMiddleware = checkCommerceEmailMiddleware;
