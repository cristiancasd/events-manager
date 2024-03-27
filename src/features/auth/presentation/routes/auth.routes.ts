import express, { Request, Response } from 'express';
import { configureDependencies } from '../../../../config';
import { validateRequest } from '../../../../core';
import { validateRefreshTokenBody, validateSigInBody, validateTokenBody } from './auth.validations';



const { authCtrl } = configureDependencies();
const authRoutes = express.Router();

authRoutes.post(
  `/signin`,
  validateSigInBody,
  validateRequest,
  authCtrl.signInCtrl,
);

authRoutes.post(
  `/refreshtoken`,
  validateRefreshTokenBody,
  validateRequest,
  authCtrl.refreshTokenCtrl,
);

authRoutes.post(
  `/validatetoken`,
  validateTokenBody,
  validateRequest,
  authCtrl.validateTokenCtrl,
);

export { authRoutes };

