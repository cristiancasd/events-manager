import { body, ValidationChain } from 'express-validator';

export const validateTicketBody: ValidationChain[] = [
  body('levelUid').isUUID().withMessage('levelUid must be UUID'),
  body('commerceUid').isUUID().withMessage('userCommerceUid must be UUID'),
  body('name').isString().withMessage('name must be String'),
  body('presaleFee').isInt().withMessage('presaleFee must be int'),
  body('saleFee').isInt().withMessage('saleFee must be int')
];

export const validateEditTicketBody: ValidationChain[] = [
  ...validateTicketBody,
  body('id').isUUID().withMessage('id must be UUID')
];
