import express, { Request, Response } from 'express';

import { body, query } from 'express-validator';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { validateRequest, validateUUIDParam } from '../../../../core';
import { checkCommerceEmailMiddleware, checkCommerceNameMiddleware, checkCommercePhoneMiddleware } from '../middelwares/db.middelwares';
import { configureDependencies } from '../../../../config';
import { validateCreateCommerceBody } from './commerce.validations';


const { commerceRepository, commerceUseCase, commerceCtrl } = configureDependencies();
const commerceRoutes = express.Router();

/// Create Commerce
//TODO: validate not empty name
commerceRoutes.post(
  `/create`,
  [
    /* body('name').isString().withMessage('name must be String'),
     body('phone').isNumeric().withMessage('phone must be number'),
     body('email').isEmail().withMessage('email must be email'),
     body('countryCode').isString().withMessage('country must be String'),
     body('city').isString().withMessage('city must be String'),
     body('totalFreePrevent').isNumeric().withMessage('totalFreePrevent must be number'),
     body('isActive').optional().isBoolean().withMessage('isActive must be bool'),
     body('dateFinish').isString().withMessage('dateFinish must be date'),
     */
    ...validateCreateCommerceBody,
    checkCommerceNameMiddleware,
    checkCommerceEmailMiddleware,
    checkCommercePhoneMiddleware,
  ],
  validateRequest,
  commerceCtrl.insertCtrl
);

/// Delete Commerce
commerceRoutes.delete(
  '/delete/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.deleteCtrl
);

/// disable Commerce
commerceRoutes.delete(
  '/disable/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.disableCtrl
);

/// Enable commerce
commerceRoutes.put(
  '/enable/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.enableCtrl
);

/// Find commerce by UID
commerceRoutes.get(
  '/find/id/:idCommerce',
  [
    validateUUIDParam('idCommerce'),
  ],
  validateRequest,
  commerceCtrl.findCtrl
);

/// Find commerce by Criteria
commerceRoutes.get(
  '/find/all',
  [
    query('statusQ').optional().isIn(['active', 'inactive']).withMessage('statusQ must be "active" or "inactive"'),
    query('locationTypeQ').optional().isIn(['city', 'country']).withMessage('locationTypeQ must be "city" or "country"'),
    query('locationQ').optional().isString().withMessage('locationQ must be string"'),
  ],
  validateRequest,
  commerceCtrl.findByCriteriaCtrl
);


export { commerceRoutes };


