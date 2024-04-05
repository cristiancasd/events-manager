import express from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import {
  validateEditProspectBody,
  validateProspectBody
} from './prospects.validations';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import { query } from 'express-validator';
import { checkPhoneExistMiddleware } from '../middlewares/prospectdb.middelwares';

const { prospectsCtrl } = configureDependencies();
const prospectRoutes = express.Router();

/// Create prospect
prospectRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateProspectBody,
    checkPhoneExistMiddleware
  ],
  validateRequest,
  prospectsCtrl.insertCtrl
);

// Edit prospect
prospectRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateEditProspectBody,
    checkPhoneExistMiddleware
  ],
  validateRequest,
  prospectsCtrl.editProspectCtrl
);

/// Find prospect by phone
prospectRoutes.get(
  '/find/:commerceUid',
  [
    checkTokenMiddleware,
    validateUUIDParam('commerceUid'),
    query('phone')
      .isString()
      .withMessage('phone must be String')
      .matches(/^[0-9]+$/, 'g')
      .withMessage('phone must contain only numeric characters')
  ],
  validateRequest,
  prospectsCtrl.findProspectCtrl
);

/// Delete prospect
prospectRoutes.delete(
  '/delete/:prospectUid',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    validateUUIDParam('prospectUid')
  ],
  validateRequest,
  prospectsCtrl.deleteCtrl
);

export { prospectRoutes };
