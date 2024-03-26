import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkEventNameMiddleware } from '../middelwares/db.middelwares';
import {
  validateCreateEventBody,
  validateFindEvents
} from './events.validations';

const { eventsCtrl } = configureDependencies();
const eventsRoutes = express.Router();

/// Create Event
//TODO: validate not empty name
eventsRoutes.post(
  `/create`,
  [...validateCreateEventBody, checkEventNameMiddleware],
  validateRequest,
  eventsCtrl.insertCtrl
);

/// Delete Event
eventsRoutes.delete(
  '/delete/:eventId',
  [validateUUIDParam('eventId')],
  validateRequest,
  eventsCtrl.deleteCtrl
);

/// Find commerce by UID
eventsRoutes.get(
  '/find/id/:eventId',
  [validateUUIDParam('eventId')],
  validateRequest,
  eventsCtrl.findCtrl
);

/// Find event by commerceId and dates
eventsRoutes.get(
  '/find/commerce/:commerceId',
  validateFindEvents,
  validateRequest,
  eventsCtrl.findEventsByCommerceCtrl
);

export { eventsRoutes };
