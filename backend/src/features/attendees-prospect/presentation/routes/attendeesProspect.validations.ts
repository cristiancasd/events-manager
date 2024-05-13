import { body, ValidationChain } from 'express-validator';

export const validateAttendeeProspectBody: ValidationChain[] = [
  body('eventUid').isUUID().withMessage('eventUid must be UUID'),
  body('prospectUid').isUUID().withMessage('prospectUid must be UUID')
];
