import express, { Request, Response } from 'express';

import { body, query } from 'express-validator';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkLevelNameMiddleware } from '../middelwares/db.middelwares';
import {
  validateCreateLevelBody,
  validateEditLevelBody
} from './level.validations';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';

const { levelCtrl } = configureDependencies();
const levelRoutes = express.Router();

/// Create Level
//TODO: validate not empty name
levelRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateCreateLevelBody,
    checkLevelNameMiddleware
  ],
  validateRequest,
  levelCtrl.insertCtrl
);

levelRoutes.put(
  `/edit`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateEditLevelBody,
    checkLevelNameMiddleware
  ],
  validateRequest,
  levelCtrl.editCtrl
);

/// Delete Level
levelRoutes.delete(
  '/delete/:commerceUid/:levelId',
  [
    validateUUIDParam('levelId'),
    validateUUIDParam('commerceUid'),
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware
  ],
  validateRequest,
  levelCtrl.deleteCtrl
);

/// Find commerce by UID
levelRoutes.get(
  '/find/id/:levelId',
  [
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    validateUUIDParam('levelId')
  ],
  validateRequest,
  levelCtrl.findCtrl
);

/// Find level by commerceUid and dates
levelRoutes.get(
  '/find/commerce/:commerceUid',
  checkTokenMiddleware,
  validateCommerceUidAndStateMiddleware,
  validateRequest,
  levelCtrl.findLevelByCommerceCtrl
);

export { levelRoutes };
