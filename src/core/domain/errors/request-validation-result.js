"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const __1 = require("../..");
// Custom error class for handling request validation errors
class RequestValidationError extends __1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param, code: __1.codeError };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
