"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateLevelBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateLevelBody = [
    (0, express_validator_1.body)('name').isString().withMessage('name must be String'),
    (0, express_validator_1.body)('typeId').isInt().withMessage('typeId must be int'),
    (0, express_validator_1.body)('commerceId').isUUID().withMessage('commerceId must be UUID')
];
