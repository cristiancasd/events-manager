import { query, body, ValidationChain } from 'express-validator';
import { ProspectType } from '../../../../core/shared/constants';

export const validateProspectBody: ValidationChain[] = [
  body('type')
    .isIn([ProspectType.prospect, ProspectType.prospectVip])
    .withMessage('invalid type'),
  body('userCommerceUid').isUUID().withMessage('userCommerceUid must be UUID'),
  body('commerceUid').isUUID().withMessage('userCommerceUid must be UUID'),

  body('name').isString().withMessage('name must be String'),
  body('phone')
    .isString()
    .withMessage('phone must be String')
    .matches(/^[0-9]+$/, 'g')
    .withMessage('phone must contain only numeric characters')
];

export const validateEditProspectBody: ValidationChain[] = [
  ...validateProspectBody,
  body('id').isUUID().withMessage('id must be UUID')
];

export const validateCreateUserCommerceBody: ValidationChain[] = [
  body('role')
    .isIn(['user', 'admin', 'super-admin', 'other'])
    .withMessage('invalid role'),
  body('levelUid').isUUID().withMessage('levelUid must be UUID'),
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
