import { query, body, ValidationChain } from 'express-validator';

export const validateCreateLevelBody: ValidationChain[] = [
  body('name').isString().withMessage('name must be String'),
  body('typeId').isInt().withMessage('typeId must be int'),
  body('commerceUid').isUUID().withMessage('commerceUid must be UUID')
];


export const validateEditLevelBody: ValidationChain[] = [
  ...validateCreateLevelBody,
  body('id').isUUID().withMessage('id must be UUID')
];

