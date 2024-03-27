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
exports.errorHandlerTypeOrm = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("../..");
// Error handler respository typeORM
const errorHandlerTypeOrm = (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield originalMethod.apply(this, args);
            }
            catch (error) {
                if (error instanceof typeorm_1.QueryFailedError) {
                    if (error.driverError.code === '23505') {
                        throw new __1.DataBaseError(': ' + __1.duplicatedDataMessage, __1.codeDbErrorDuplicated);
                    }
                    throw new __1.DataBaseError('', __1.codeDbError);
                }
                if (error instanceof __1.CustomError) {
                    throw error;
                }
                throw new __1.ServerError();
            }
        });
    };
    return descriptor;
};
exports.errorHandlerTypeOrm = errorHandlerTypeOrm;
