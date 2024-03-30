import { query, body, ValidationChain } from 'express-validator';

export const validateCreateUserBody: ValidationChain[] = [
  body('role')
    .isIn(['user', 'admin', 'super-admin', 'other'])
    .withMessage('invalid role'),
  body('levelUid').isUUID().withMessage('levelUid must be UUID'),
  body('name').isString().withMessage('name must be String'),
  body('phone').isInt().withMessage('phone must be int'),
  body('document').isInt().withMessage('document must be int'),
  body('commerceUserId')
    .isString()
    .withMessage('commerceUserId must be String'),
  body('commerceUid').isUUID().withMessage('commerceUid must be UUID'),
  body('email').isEmail().withMessage('email must be Email'),
  body('password').isString().withMessage('password must be string'),
  body('isActive').isBoolean().withMessage('isActive must be boolean'),
  body('freeSpace')
    .optional()
    .isString()
    .withMessage('freeSpace must be String')
];
