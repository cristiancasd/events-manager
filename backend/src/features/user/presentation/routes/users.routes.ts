import express, { Request, Response } from 'express';

import { validateRequest, validateUUIDParam } from '../../../../core';
import { configureDependencies } from '../../../../config';
import { checkUserNameMiddleware } from '../middelwares/usersdb.middelwares';
import {
  validateCreateUserBody,
  validateCreateUserCommerceBody
} from './users.validations';
import {
  checkTokenMiddleware,
  isAdminMiddleware,
  validateCommerceUidAndStateMiddleware
} from '../../../auth/presentation/middelwares/auth.middelwares';
import { query } from 'express-validator';

const { userCtrl } = configureDependencies();
const userRoutes = express.Router();

/// Create User
//TODO: validate not empty name
userRoutes.post(
  `/create/complete`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateCreateUserBody,
    checkUserNameMiddleware
  ],
  validateRequest,
  userCtrl.insertCtrl
);

userRoutes.post(
  `/create/usercommerce`,
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    ...validateCreateUserCommerceBody,
    checkUserNameMiddleware
  ],
  validateRequest,
  userCtrl.insertUserCommerceCtrl
);

userRoutes.get('/me', [checkTokenMiddleware], validateRequest, userCtrl.meCtrl);

/// Find usser by UID
userRoutes.get(
  '/find/id/:userId',
  [checkTokenMiddleware, isAdminMiddleware, validateUUIDParam('userId')],
  validateRequest,
  userCtrl.findCtrl
);

/// Find user by email
userRoutes.get(
  '/find/email/:commerceUid',
  [
    validateUUIDParam('commerceUid'),
    checkTokenMiddleware,
    validateCommerceUidAndStateMiddleware,
    query('email').isEmail().withMessage('Invalid email format')
  ],
  validateRequest,
  userCtrl.findUserCommerceByEmailCtrl
);

/// Find user by commerceUid and levels
userRoutes.get(
  '/find/level/:commerceUid/:levelUid',
  [
    validateUUIDParam('commerceUid'),
    validateUUIDParam('levelUid'),
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware
  ],
  validateRequest,
  userCtrl.findUserByLevelCtrl
);

/// Delete User
userRoutes.delete(
  '/delete/:userId',
  [
    checkTokenMiddleware,
    isAdminMiddleware,
    validateCommerceUidAndStateMiddleware,
    validateUUIDParam('userId')
  ],
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
