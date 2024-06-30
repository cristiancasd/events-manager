import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import {
  validateEditTicketProspectFeeBody,
  validateTicketProspectFeeBody
} from './ticketProspectFee.validations';

const { ticketProspectFeeCtrl } = configureDependencies();
const ticketProspectFeeRoutes = express.Router();

/// Create ticket
ticketProspectFeeRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateTicketProspectFeeBody
  ],
  validateRequest,
  ticketProspectFeeCtrl.insertCtrl
);

// Edit ticket
ticketProspectFeeRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateEditTicketProspectFeeBody
  ],
  validateRequest,
  ticketProspectFeeCtrl.editTicketCtrl
);

/// Find ticket by phone
ticketProspectFeeRoutes.get(
  '/find/commerce/:commerceUid',
  [checkTokenMiddleware, validateUUIDParam('commerceUid')],
  validateRequest,
  ticketProspectFeeCtrl.listTicketsCtrl
);

/// Delete ticket
ticketProspectFeeRoutes.delete(
  '/delete/:ticketUid',
  [checkTokenMiddleware, isAdminMiddleware, validateUUIDParam('ticketUid')],
  validateRequest,
  ticketProspectFeeCtrl.deleteCtrl
);

export { ticketProspectFeeRoutes };
