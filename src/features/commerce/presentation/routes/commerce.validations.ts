
import { body, ValidationChain } from 'express-validator';

export const validateCreateCommerceBody: ValidationChain[] = [
  body('name').isString().withMessage('name must be String'),
  body('phone').isNumeric().withMessage('phone must be number'),
  body('email').isEmail().withMessage('email must be email'),
  body('countryCode').isString().withMessage('country must be String'),
  body('city').isString().withMessage('city must be String'),
  body('totalFreePrevent').isNumeric().withMessage('totalFreePrevent must be number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be bool'),
  body('dateFinish').isString().withMessage('dateFinish must be date'),
];
