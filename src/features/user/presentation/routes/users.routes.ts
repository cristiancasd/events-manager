import express, { Request, Response } from 'express';

import { body, query } from 'express-validator';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkUserNameMiddleware } from '../middelwares/usersdb.middelwares';
import { validateCreateUserBody } from './users.validations';

const { userCtrl } = configureDependencies();
const userRoutes = express.Router();

/// Create User
//TODO: validate not empty name
userRoutes.post(
  `/create`,
  [
    ...validateCreateUserBody,
    checkUserNameMiddleware
  ],
  validateRequest,
  userCtrl.insertCtrl
);
/*
/// Delete User
userRoutes.delete(
  '/delete/:userId',
  [validateUUIDParam('userId')],
  validateRequest,
  userCtrl.deleteCtrl
);

/// enable User
userRoutes.put(
  '/enable/:userId',
  [validateUUIDParam('userId')],
  validateRequest,
  userCtrl.enableUserByUidCtrl
);

/// disable User
userRoutes.delete(
  '/disable/:userId',
  [validateUUIDParam('userId')],
  validateRequest,
  userCtrl.disableUserByUidCtrl
);

/// Find commerce by UID
userRoutes.get(
  '/find/id/:userId',
  [validateUUIDParam('userId')],
  validateRequest,
  userCtrl.findCtrl
);

/// Find user by commerceId and levels
userRoutes.get(
  '/find/level/:commerceId/:levelUid',
  [validateUUIDParam('commerceId'), validateUUIDParam('levelUid')],
  validateRequest,
  userCtrl.findUserByLevelCtrl
);*/

export { userRoutes };
