import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import {
  validateEditProspectTicketBody,
  validateProspectTicketBody
} from './prospectTicket.validations';
import { checkRelationProspectTicketMiddleware } from '../middlewares/prospectTicketdb.middelwares';

const { prospectTicketCtrl } = configureDependencies();
const prospectTicketRoutes = express.Router();

/// list relations prospect-tickets
prospectTicketRoutes.get(
  '/find/commerce/:commerceUid/:eventUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('commerceUid'),
    validateUUIDParam('eventUid')
  ],
  validateRequest,
  prospectTicketCtrl.listCtrl
);

/// find relations prospect-tickets
prospectTicketRoutes.get(
  '/find/one/:prospectUid/:eventUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('prospectUid'),
    validateUUIDParam('eventUid')
  ],
  validateRequest,
  prospectTicketCtrl.findCtrl
);

/// Create relation prospect-ticket
prospectTicketRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    ...validateProspectTicketBody,
    checkRelationProspectTicketMiddleware
  ],
  validateRequest,
  prospectTicketCtrl.insertCtrl
);

// Edit ticket
prospectTicketRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    ...validateEditProspectTicketBody,
    checkRelationProspectTicketMiddleware
  ],
  validateRequest,
  prospectTicketCtrl.editCtrl
);

/// Delete ticket
prospectTicketRoutes.delete(
  '/delete/:prospectTicketUid',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('prospectTicketUid')
  ],
  validateRequest,
  prospectTicketCtrl.deleteCtrl
);

export { prospectTicketRoutes };
