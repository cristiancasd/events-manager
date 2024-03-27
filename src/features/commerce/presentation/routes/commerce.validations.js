"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBothLocationTypeAndLocation = exports.validateFindAllEvents = exports.validateCreateCommerceBody = void 0;
const express_validator_1 = require("express-validator");
const bad_request_error_1 = require("../../../../core/domain/errors/bad-request-error");
exports.validateCreateCommerceBody = [
    (0, express_validator_1.body)('name').isString().withMessage('name must be String'),
    (0, express_validator_1.body)('phone').isNumeric().withMessage('phone must be number'),
    (0, express_validator_1.body)('email').isEmail().withMessage('email must be email'),
    (0, express_validator_1.body)('countryCode').isString().withMessage('country must be String'),
    (0, express_validator_1.body)('city').isString().withMessage('city must be String'),
    (0, express_validator_1.body)('totalFreePrevent')
        .isNumeric()
        .withMessage('totalFreePrevent must be number'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive must be bool'),
    (0, express_validator_1.body)('dateFinish').isString().withMessage('dateFinish must be date')
];
exports.validateFindAllEvents = [
    (0, express_validator_1.query)('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('status must be "active" or "inactive"'),
    (0, express_validator_1.query)('locationType')
        .optional()
        .isIn(['city', 'country'])
        .withMessage('locationType must be "city" or "country"'),
    (0, express_validator_1.query)('location')
        .optional()
        .isString()
        .withMessage('location must be string"')
];
const checkBothLocationTypeAndLocation = (req, res, next) => {
    const { locationType, location } = req.query;
    if ((locationType && !location) || (!locationType && location)) {
        throw new bad_request_error_1.BadRequestError('Both locationType and location are required if one is present.');
    }
    next();
};
exports.checkBothLocationTypeAndLocation = checkBothLocationTypeAndLocation;
