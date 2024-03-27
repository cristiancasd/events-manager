"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUIDParam = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../../shared/constants");
// Param is UUiD validation
const validateUUIDParam = (paramName) => {
    return (0, express_validator_1.param)(paramName)
        .isUUID()
        .withMessage(`${paramName} ${constants_1.mustBeUidMessage}`);
};
exports.validateUUIDParam = validateUUIDParam;
