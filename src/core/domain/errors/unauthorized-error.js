"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const __1 = require("../..");
// Custom error class for handling unauthorized errors
class UnauthorizedError extends __1.CustomError {
    constructor(code) {
        super('Bad Credentials');
        this.code = code;
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeErrors() {
        var _a;
        return [{ message: this.message, code: (_a = this.code) !== null && _a !== void 0 ? _a : __1.codeError }];
    }
}
exports.UnauthorizedError = UnauthorizedError;
