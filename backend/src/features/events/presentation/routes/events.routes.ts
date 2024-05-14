import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkEventNameMiddleware } from '../middelwares/db.middelwares';
import {
  validateCreateEventBody,
  validateEditEventBody,
  validateFindEvents
} from './events.validations';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';

const { eventsCtrl } = configureDependencies();
const eventsRoutes = express.Router();

/// Create Event
//TODO: validate not empty name
eventsRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateCreateEventBody,
    checkEventNameMiddleware
  ],
  validateRequest,
  eventsCtrl.insertCtrl
);

eventsRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateEditEventBody,
    checkEventNameMiddleware
  ],
  validateRequest,
  eventsCtrl.editCtrl
);

/// Delete Event
eventsRoutes.delete(
  '/delete/:commerceUid/:eventId',
  [
    validateUUIDParam('eventId'),
    validateUUIDParam('commerceUid'),
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware
  ],
  validateRequest,
  eventsCtrl.deleteCtrl
);

/// Find commerce by UID
eventsRoutes.get(
  '/find/id/:eventId',
  [checkTokenMiddleware, validateUUIDParam('eventId')],
  validateRequest,
  eventsCtrl.findCtrl
);

/// Find event by commerceUid and dates
eventsRoutes.get(
  '/find/commerce/:commerceUid',
  [
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateFindEvents
  ],
  validateRequest,
  eventsCtrl.findEventsByCommerceCtrl
);

export { eventsRoutes };
