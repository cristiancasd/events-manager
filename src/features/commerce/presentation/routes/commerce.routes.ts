import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import {
  checkCommerceEmailMiddleware,
  checkCommerceNameMiddleware,
  checkCommerceNickMiddleware,
  checkCommercePhoneMiddleware
} from '../middelwares/db.middelwares';
import { configureDependencies } from '../../../../config';
import {
  checkBothLocationTypeAndLocation,
  validateCreateCommerceBody,
  validateFindAllEvents
} from './commerce.validations';
import {
  checkTokenMiddleware,
  validateRolesMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
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
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    ...validateCreateCommerceBody,
    checkCommerceNameMiddleware,
    checkCommerceNickMiddleware,
    checkCommerceEmailMiddleware,
    checkCommercePhoneMiddleware
  ],
  validateRequest,
  commerceCtrl.insertCtrl
);

/// Delete Commerce
commerceRoutes.delete(
  '/delete/:idCommerce',
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    validateUUIDParam('idCommerce')
  ],
  validateRequest,
  commerceCtrl.deleteCtrl
);

/// disable Commerce
commerceRoutes.delete(
  '/disable/:idCommerce',
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    validateUUIDParam('idCommerce')
  ],
  validateRequest,
  commerceCtrl.disableCtrl
);

/// Enable commerce
commerceRoutes.put(
  '/enable/:idCommerce',
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    validateUUIDParam('idCommerce')
  ],
  validateRequest,
  commerceCtrl.enableCtrl
);

/// Find commerce by UID
commerceRoutes.get(
  '/find/id/:idCommerce',
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    validateUUIDParam('idCommerce')
  ],
  validateRequest,
  commerceCtrl.findCtrl
);

/// Find commerce by Criteria
commerceRoutes.get(
  '/find/all',
  [
    checkTokenMiddleware,
    validateRolesMiddleware([CommerceUserRoles.masterAdmin]),
    ...validateFindAllEvents,
    checkBothLocationTypeAndLocation
  ],
  validateRequest,
  commerceCtrl.findByCriteriaCtrl
);

export { commerceRoutes };
