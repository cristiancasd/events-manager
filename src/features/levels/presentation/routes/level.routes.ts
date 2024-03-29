import express, { Request, Response } from 'express';

import { body, query } from 'express-validator';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkLevelNameMiddleware } from '../middelwares/db.middelwares';
import { validateCreateLevelBody } from './level.validations';
import { checkTokenMiddleware, isAdminMiddleware } from '../../../auth/presentation/middelwares/auth.middelwares';

const { levelCtrl } = configureDependencies();
const levelRoutes = express.Router();

/// Create Level
//TODO: validate not empty name
levelRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    ...validateCreateLevelBody, 
    checkLevelNameMiddleware,
  ],
  validateRequest,
  levelCtrl.insertCtrl
);

/// Delete Level
levelRoutes.delete(
  '/delete/:levelId',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('levelId'),
  ],
  validateRequest,
  levelCtrl.deleteCtrl
);

/// Find commerce by UID
levelRoutes.get(
  '/find/id/:levelId',
  [
    checkTokenMiddleware,
    validateUUIDParam('levelId')
  ],
  validateRequest,
  levelCtrl.findCtrl
);

/// Find level by commerceId and dates
levelRoutes.get(
  '/find/commerce/:commerceId',
  checkTokenMiddleware,
  validateRequest,
  levelCtrl.findLevelByCommerceCtrl
);

export { levelRoutes };
