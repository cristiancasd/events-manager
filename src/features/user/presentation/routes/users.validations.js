"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUserBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateUserBody = [
    (0, express_validator_1.body)('role')
        .isIn(['user', 'admin', 'super-admin', 'other'])
        .withMessage('invalid role'),
    (0, express_validator_1.body)('levelUid').isUUID().withMessage('levelUid must be UUID'),
    (0, express_validator_1.body)('name').isString().withMessage('name must be String'),
    (0, express_validator_1.body)('phone').isInt().withMessage('phone must be int'),
    (0, express_validator_1.body)('document').isInt().withMessage('document must be int'),
    (0, express_validator_1.body)('commerceUserId')
        .isString()
        .withMessage('commerceUserId must be String'),
    (0, express_validator_1.body)('commerceId').isUUID().withMessage('commerceId must be UUID'),
    (0, express_validator_1.body)('email').isEmail().withMessage('email must be Email'),
    (0, express_validator_1.body)('password').isString().withMessage('password must be string'),
    (0, express_validator_1.body)('isActive').isBoolean().withMessage('isActive must be boolean'),
    (0, express_validator_1.body)('freeSpace')
        .optional()
        .isString()
        .withMessage('freeSpace must be String')
];
