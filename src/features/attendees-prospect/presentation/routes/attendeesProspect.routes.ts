import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';

import {
  checkTokenMiddleware,
  isAdminMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import { query } from 'express-validator';
import { validateAttendeeProspectBody } from './attendeesProspect.validations';

const { attendeeProspectCtrl } = configureDependencies();
const attendeesProspectRoutes = express.Router();

/// Create attendee prospect
attendeesProspectRoutes.post(
  `/create`,
  [checkTokenMiddleware, isAdminMiddleware, ...validateAttendeeProspectBody],
  validateRequest,
  attendeeProspectCtrl.insertCtrl
);

/// Find attendees prospect
attendeesProspectRoutes.get(
  '/find/:eventUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('eventUid'),
    query('userCommerceUid')
      .optional()
      .isUUID()
      .withMessage('userCommerceUid must be UIDD')
  ],
  validateRequest,
  attendeeProspectCtrl.findAttendeesCtrl
);

export { attendeesProspectRoutes };
