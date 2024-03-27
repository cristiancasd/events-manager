"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const __1 = require("../..");
// Custom error class for handling server errors
class ServerError extends __1.CustomError {
    constructor(code) {
        super('');
        this.code = code;
        this.statusCode = 500;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
    serializeErrors() {
        var _a;
        return [{ message: 'Internal Server Error', code: (_a = this.code) !== null && _a !== void 0 ? _a : __1.codeError }];
    }
}
exports.ServerError = ServerError;
