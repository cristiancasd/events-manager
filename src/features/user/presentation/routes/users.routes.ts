import express, { Request, Response } from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkUserNameMiddleware } from '../middelwares/usersdb.middelwares';
import { validateCreateUserBody } from './users.validations';
import { checkTokenMiddleware, isAdminMiddleware } from '../../../auth/presentation/middelwares/auth.middelwares';

const { userCtrl } = configureDependencies();
const userRoutes = express.Router();

/// Create User
//TODO: validate not empty name
userRoutes.post(
  `/create`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    ...validateCreateUserBody, 
    checkUserNameMiddleware,
  ],
  validateRequest,
  userCtrl.insertCtrl
);

/// Find usser by UID
userRoutes.get(
  '/find/id/:userId',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('userId')],
  validateRequest,
  userCtrl.findCtrl
);

/// Find user by commerceId and levels
userRoutes.get(
  '/find/level/:commerceId/:levelUid',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('commerceId'), 
    validateUUIDParam('levelUid')],
  validateRequest,
  userCtrl.findUserByLevelCtrl
);

/// Delete User
userRoutes.delete(
  '/delete/:userId',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateUUIDParam('userId')],
  validateRequest,
  userCtrl.deleteCtrl
);

/*
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



*/

export { userRoutes };
