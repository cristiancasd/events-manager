import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import {
  checkCommerceEmailMiddleware,
  checkCommerceNameMiddleware,
  checkCommercePhoneMiddleware
} from '../middelwares/db.middelwares';
import { configureDependencies } from '../../../../config';
import {
  checkBothLocationTypeAndLocation,
  validateCreateCommerceBody,
  validateFindAllEvents
} from './commerce.validations';
import { checkTokenMiddleware, validateRolesMiddleware } from '../../../auth/presentation/middelwares/auth.middelwares';
import { CommerceUserRoles } from '../../../../core/shared/constants';
//import { checkTokenMiddleware } from '../../../auth';

const { commerceCtrl } = configureDependencies();
const commerceRoutes = express.Router();

/// Create Commerce
//TODO: validate not empty name
commerceRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.admin]),
    ...validateCreateCommerceBody,
    checkCommerceNameMiddleware,
    checkCommerceEmailMiddleware,
    checkCommercePhoneMiddleware
  ],
  validateRequest,
  commerceCtrl.insertCtrl
);

/// Delete Commerce
commerceRoutes.delete(
  '/delete/:idCommerce',
  [validateUUIDParam('idCommerce')],
  validateRequest,
  commerceCtrl.deleteCtrl
);

/// disable Commerce
commerceRoutes.delete(
  '/disable/:idCommerce',
  [validateUUIDParam('idCommerce')],
  validateRequest,
  commerceCtrl.disableCtrl
);

/// Enable commerce
commerceRoutes.put(
  '/enable/:idCommerce',
  [validateUUIDParam('idCommerce')],
  validateRequest,
  commerceCtrl.enableCtrl
);

/// Find commerce by UID
commerceRoutes.get(
  '/find/id/:idCommerce',
  [validateUUIDParam('idCommerce')],
  validateRequest,
  commerceCtrl.findCtrl
);

/// Find commerce by Criteria
commerceRoutes.get(
  '/find/all',
  [...validateFindAllEvents, checkBothLocationTypeAndLocation],
  validateRequest,
  commerceCtrl.findByCriteriaCtrl
);

export { commerceRoutes };
