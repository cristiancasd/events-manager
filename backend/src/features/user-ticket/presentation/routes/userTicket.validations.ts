import { body, ValidationChain } from 'express-validator';

export const validateUserTicketBody: ValidationChain[] = [
  body('userCommerceUid').isUUID().withMessage('userCommerceUid must be UUID'),
  body('eventUid').isUUID().withMessage('eventUid must be UUID'),
  body('totalAttendees').isInt().withMessage('totalAttendees must be int'),
  body('fee').isInt().withMessage('fee must be int'),
  body('hasPresale').isBoolean().withMessage('hasPresale must be boolean')
];

export const validateEditUserTicketBody: ValidationChain[] = [
  ...validateUserTicketBody,
  body('id').isUUID().withMessage('id must be UUID')
];
