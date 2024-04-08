import { body, ValidationChain } from 'express-validator';

export const validateAttendeeUserBody: ValidationChain[] = [
  body('eventUid').isUUID().withMessage('eventUid must be UUID'),
  body('commerceUid').isUUID().withMessage('userCommerceUid must be UUID')
];
