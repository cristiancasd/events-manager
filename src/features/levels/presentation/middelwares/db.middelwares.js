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
exports.checkLevelNameMiddleware = void 0;
const core_1 = require("../../../../core");
const express_validator_1 = require("express-validator");
const config_1 = require("../../../../config");
const bad_request_error_1 = require("../../../../core/domain/errors/bad-request-error");
const { levelUseCase } = (0, config_1.configureDependencies)();
const checkLevelNameMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, typeId, commerceId } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            if (!commerceId)
                throw new bad_request_error_1.BadRequestError(core_1.commerceIdInvalidMessage);
            const nameExist = yield levelUseCase.validateDuplicatedData((_a = commerceId === null || commerceId === void 0 ? void 0 : commerceId.toString()) !== null && _a !== void 0 ? _a : '', name, undefined);
            if (nameExist)
                throw new core_1.DataBaseError(core_1.duplicatedNameMessage, core_1.codeDbNameDuplicated);
            const typeIdExist = yield levelUseCase.validateDuplicatedData((_b = commerceId === null || commerceId === void 0 ? void 0 : commerceId.toString()) !== null && _b !== void 0 ? _b : '', undefined, typeId);
            if (typeIdExist)
                throw new core_1.DataBaseError(core_1.duplicatedTypeIdMessage, core_1.codeDbTypeIdDuplicated);
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
exports.checkLevelNameMiddleware = checkLevelNameMiddleware;
