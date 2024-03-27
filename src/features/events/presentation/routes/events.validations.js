"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFindEvents = exports.validateCreateEventBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateEventBody = [
    (0, express_validator_1.body)('name').isString().withMessage('name must be String'),
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('description must be string'),
    (0, express_validator_1.body)('date').isString().withMessage('date must be Date'),
    (0, express_validator_1.body)('url').optional().isURL().withMessage('url must be a URL'),
    (0, express_validator_1.body)('commerceId').isUUID().withMessage('commerceId must be UUID')
];
exports.validateFindEvents = [
    (0, express_validator_1.query)('finishDate')
        .optional()
        .isDate()
        .withMessage('finishDate must be a valid date')
        .custom((value) => {
        if (value) {
            const finishDate = new Date(value);
            const currentDate = new Date();
            if (finishDate >= currentDate) {
                throw new Error('startDate must be a date more recent than finishDate');
            }
        }
        return true;
    }),
    (0, express_validator_1.query)('startDate')
        .optional()
        .isDate()
        .withMessage('startDate must be a valid date')
        .custom((value, { req }) => {
        var _a;
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.finishDate) {
            const finishDate = req.query.finishDate;
            if (value && finishDate) {
                const startDate = new Date(value);
                const endDate = new Date(finishDate);
                if (startDate >= endDate) {
                    throw new Error('startDate must be a date more recent than finishDate');
                }
            }
        }
        return true;
    })
];
