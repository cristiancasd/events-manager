import { body, ValidationChain } from 'express-validator';

export const validateAttendeeUserBody: ValidationChain[] = [
  body('eventUid').isUUID().withMessage('eventUid must be UUID'),
  body('userCommerceUid').isUUID().withMessage('userCommerceUid must be UUID')
];
