"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InactiveDataError = void 0;
const __1 = require("../..");
const custom_error_1 = require("./custom-error");
//TODO: refactor this. Message
// Custom error class for handling inactive errors
class InactiveDataError extends custom_error_1.CustomError {
    constructor(code) {
        super('Route not found');
        this.code = code;
        this.statusCode = 400;
        Object.setPrototypeOf(this, InactiveDataError.prototype);
    }
    serializeErrors() {
        var _a;
        return [{ message: 'Not Found', code: (_a = this.code) !== null && _a !== void 0 ? _a : __1.codeDbErrorInactive }];
    }
}
exports.InactiveDataError = InactiveDataError;
