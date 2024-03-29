import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkEventNameMiddleware } from '../middelwares/db.middelwares';
import {
  validateCreateEventBody,
  validateFindEvents
} from './events.validations';
import { checkTokenMiddleware, isAdminMiddleware } from '../../../auth/presentation/middelwares/auth.middelwares';

const { eventsCtrl } = configureDependencies();
const eventsRoutes = express.Router();

/// Create Event
//TODO: validate not empty name
eventsRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    ...validateCreateEventBody,
    checkEventNameMiddleware
  ],
  validateRequest,
  eventsCtrl.insertCtrl
);

/// Delete Event
eventsRoutes.delete(
  '/delete/:eventId',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('eventId')
  ],
  validateRequest,
  eventsCtrl.deleteCtrl
);

/// Find commerce by UID
eventsRoutes.get(
  '/find/id/:eventId',
  [
    checkTokenMiddleware,
    validateUUIDParam('eventId')
  ],
  validateRequest,
  eventsCtrl.findCtrl
);

/// Find event by commerceId and dates
eventsRoutes.get(
  '/find/commerce/:commerceId',
  [
    checkTokenMiddleware,
    ...validateFindEvents,
  ],
  validateRequest,
  eventsCtrl.findEventsByCommerceCtrl
);

export { eventsRoutes };
