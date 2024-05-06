import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import {
  validateEditUserTicketBody,
  validateUserTicketBody
} from './userTicket.validations';
import { checkRelationUserTicketMiddleware } from '../middlewares/userTicketdb.middelwares';

const { userTicketCtrl } = configureDependencies();
const userTicketRoutes = express.Router();

/// list relations user-tickets
userTicketRoutes.get(
  '/find/commerce/:commerceUid/:levelUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('commerceUid'),
    validateUUIDParam('levelUid')
  ],
  validateRequest,
  userTicketCtrl.listCtrl
);

/// find relations user-tickets
userTicketRoutes.get(
  '/find/one/:userCommerceUid/:eventUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('userCommerceUid'),
    validateUUIDParam('eventUid')
  ],
  validateRequest,
  userTicketCtrl.findCtrl
);

/// Create relation user-ticket
userTicketRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    ...validateUserTicketBody,
    checkRelationUserTicketMiddleware
  ],
  validateRequest,
  userTicketCtrl.insertCtrl
);

// Edit ticket
userTicketRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    ...validateEditUserTicketBody,
    checkRelationUserTicketMiddleware
  ],
  validateRequest,
  userTicketCtrl.editCtrl
);

/// Delete ticket
userTicketRoutes.delete(
  '/delete/:userTicketUid',
  [checkTokenMiddleware, isAdminMiddleware, validateUUIDParam('userTicketUid')],
  validateRequest,
  userTicketCtrl.deleteCtrl
);

export { userTicketRoutes };
