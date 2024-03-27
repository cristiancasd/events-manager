"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const __1 = require("../..");
// Custom error class for handling bad request errors
class BadRequestError extends __1.CustomError {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        var _a;
        return [{ message: this.message, code: (_a = this.code) !== null && _a !== void 0 ? _a : __1.codeError }];
    }
}
exports.BadRequestError = BadRequestError;
