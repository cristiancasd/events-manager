import { body, ValidationChain } from 'express-validator';
import { ProspectType } from '../../../../core';
const prospectTypeValues = Object.values(ProspectType);

export const validateTicketProspectFeeBody: ValidationChain[] = [
  body('commerceUid').isUUID().withMessage('commerceUid must be UUID'),
  body('name').isIn(prospectTypeValues).withMessage(`name must be one of the following values: ${prospectTypeValues.join(', ')}`),
  body('fee').isInt().withMessage('fee must be int')
];

export const validateEditTicketProspectFeeBody: ValidationChain[] = [
  ...validateTicketProspectFeeBody,
  body('id').isUUID().withMessage('id must be UUID')
];
