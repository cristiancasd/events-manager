"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
const constants_1 = require("../../shared/constants");
const custom_error_1 = require("./custom-error");
// Custom error class for handling data base errors
class DataBaseError extends custom_error_1.CustomError {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        this.statusCode = 400;
        Object.setPrototypeOf(this, DataBaseError.prototype);
    }
    serializeErrors() {
        var _a;
        return [
            {
                message: 'Data Base Error' + this.message,
                code: (_a = this.code) !== null && _a !== void 0 ? _a : constants_1.codeError
            }
        ];
    }
}
exports.DataBaseError = DataBaseError;
