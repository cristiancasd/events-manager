import express, { Request, Response } from 'express';

import { CommerceUseCase } from '../../application/commerceUseCase';
import { ValidationChain, body, param } from 'express-validator';
import { CommerceController } from '../controllers/commerce.ctrl';
//import { MockRepository } from '../../infrastructure/repository/mock.repository';
import { TypeOrmCommerceRepository } from '../../infrastructure/repository/typeOrm.repository';
import { validateRequest } from '../../../../core';
import { validateUUIDParam } from './commerce.validations';

const commerceRoutes = express.Router();



//const commerceRepo = new MockRepository()   // To use db Mock
//const commerceRepo = new SequelizeCommerceRepository(); 
const commerceRepo = new TypeOrmCommerceRepository(); // To use db Dynamo


const commerceUseCase = new CommerceUseCase(commerceRepo);

const commerceCtrl = new CommerceController(commerceUseCase);

commerceRoutes.post(
  `/create`,
  [
    body('name').isString().withMessage('name must be String'),
    body('phone').isNumeric().withMessage('phone must be number'),
    body('email').isEmail().withMessage('email must be email'),
    body('countryCode').isString().withMessage('country must be String'),
    body('city').isString().withMessage('city must be String'),
    body('totalFreePrevent').isNumeric().withMessage('totalFreePrevent must be number'),
    body('isActive').optional().isBoolean().withMessage('isActive must be bool'),
    body('dateFinish').isString().withMessage('dateFinish must be date'),
  ],
  validateRequest,
  commerceCtrl.insertCtrl
);


commerceRoutes.delete(
  '/delete/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.deleteCtrl
);

commerceRoutes.delete(
  '/disable/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.disableCtrl
);

commerceRoutes.put(
  '/disable/:idCommerce',
  [
    validateUUIDParam('idCommerce'),],
  validateRequest,
  commerceCtrl.enableCtrl
);

commerceRoutes.get(
  '/find/id/:idCommerce',
  [
    validateUUIDParam('idCommerce'),
  ],
  validateRequest,
  commerceCtrl.findCtrl
);

commerceRoutes.get(
  '/find/all?{statusQ, locationTypeQ, locationQ}',
  [
    body('locationQ').isString().optional().withMessage('statusQ must be String'),
  ],
  validateRequest,
  commerceCtrl.findCtrl
);

export { commerceRoutes };


