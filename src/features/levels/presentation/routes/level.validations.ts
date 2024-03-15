import { query, body, ValidationChain } from 'express-validator';

export const validateCreateLevelBody: ValidationChain[] = [
  body('name').isString().withMessage('name must be String'),
  body('typeId').isInt().withMessage('typeId must be int'),
  body('commerceId').isUUID().withMessage('commerceId must be UUID'),

];

