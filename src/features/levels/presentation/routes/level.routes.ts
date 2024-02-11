import express, { Request, Response } from 'express';

import { body, query } from 'express-validator';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkLevelNameMiddleware } from '../middelwares/db.middelwares';
import { validateCreateLevelBody } from './level.validations';


const { levelCtrl } = configureDependencies();
const levelRoutes = express.Router();

/// Create Level
//TODO: validate not empty name
levelRoutes.post(
  `/create`,
  [
    query('commerceId').isUUID().withMessage('commerceId must be UUID'),
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
    validateUUIDParam('levelId'),],
  validateRequest,
  levelCtrl.deleteCtrl
);


/// Find commerce by UID
levelRoutes.get(
  '/find/id/:levelId',
  [
    validateUUIDParam('levelId'),
  ],
  validateRequest,
  levelCtrl.findCtrl
);

/// Find level by commerceId and dates
levelRoutes.get(
  '/find/commerce/:commerceId',
  validateRequest,
  levelCtrl.findLevelByCommerceCtrl
);

export { levelRoutes };


