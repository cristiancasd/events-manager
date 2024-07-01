import { body, ValidationChain } from 'express-validator';

export const validateProspectTicketBody: ValidationChain[] = [
  body('prospectUid').isUUID().withMessage('prospectUid must be UUID'),
  body('eventUid').isUUID().withMessage('eventUid must be UUID'),
  body('fee').isInt().withMessage('fee must be int')
];

export const validateEditProspectTicketBody: ValidationChain[] = [
  ...validateProspectTicketBody,
  body('id').isUUID().withMessage('id must be UUID')
];
