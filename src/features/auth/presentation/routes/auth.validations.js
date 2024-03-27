"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenBody = exports.validateRefreshTokenBody = exports.validateSigInBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateSigInBody = [
    (0, express_validator_1.body)('email').isEmail().withMessage('invalid email'),
    (0, express_validator_1.body)('password').isString().withMessage('invalid password'),
];
exports.validateRefreshTokenBody = [
    (0, express_validator_1.body)('refreshToken').isString().withMessage('invalid refresh token format'),
];
exports.validateTokenBody = [
    (0, express_validator_1.header)('Authorization').isString().withMessage('Token missing or invalid format'),
];
