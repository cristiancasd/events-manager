import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import { checkNameExistMiddleware } from '../middlewares/ticketdb.middelwares';
import {
  validateEditTicketBody,
  validateTicketBody
} from './ticket.validations';

const { ticketCtrl } = configureDependencies();
const ticketRoutes = express.Router();

/// Create ticket
ticketRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateTicketBody,
    checkNameExistMiddleware
  ],
  validateRequest,
  ticketCtrl.insertCtrl
);

// Edit ticket
ticketRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateEditTicketBody,
    checkNameExistMiddleware
  ],
  validateRequest,
  ticketCtrl.editTicketCtrl
);

/// Find ticket by phone
ticketRoutes.get(
  '/find/commerce/:commerceUid',
  [checkTokenMiddleware, validateUUIDParam('commerceUid')],
  validateRequest,
  ticketCtrl.listTicketsCtrl
);

/// Delete ticket
ticketRoutes.delete(
  '/delete/:ticketUid',
  [checkTokenMiddleware, isAdminMiddleware, validateUUIDParam('ticketUid')],
  validateRequest,
  ticketCtrl.deleteCtrl
);

export { ticketRoutes };
