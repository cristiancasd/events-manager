import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';

import {
  checkTokenMiddleware,
  isAdminMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import { query } from 'express-validator';
import { validateAttendeeUserBody } from './attendeesUser.validations';

const { attendeeUserCtrl } = configureDependencies();
const attendeesUserRoutes = express.Router();

/// Create attendeeUser
attendeesUserRoutes.post(
  `/create`,
  [checkTokenMiddleware, isAdminMiddleware, ...validateAttendeeUserBody],
  validateRequest,
  attendeeUserCtrl.insertCtrl
);

/// Find attendees User
attendeesUserRoutes.get(
  '/find/:eventUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('eventUid'),
    query('levelUid').optional().isUUID().withMessage('levelUid must be UIDD')
  ],
  validateRequest,
  attendeeUserCtrl.findAttendeesCtrl
);

export { attendeesUserRoutes };
