import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, query } from 'express-validator';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

export const validateCreateCommerceBody: ValidationChain[] = [
  body('nick').isString().withMessage('nick must be String'),
  body('name').isString().withMessage('name must be String'),
  body('phone')
    .isString()
    .withMessage('phone must be string')
    .matches(/^[0-9]+$/, 'g')
    .withMessage('phone must contain only numeric characters'),
  body('email').isEmail().withMessage('email must be email'),
  body('countryCode').isString().withMessage('country must be String'),
  body('city').isString().withMessage('city must be String'),
  body('totalFreePrevent')
    .isNumeric()
    .withMessage('totalFreePrevent must be number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be bool'),
  body('dateFinish').isString().withMessage('dateFinish must be date')
];

export const validateFindAllEvents: ValidationChain[] = [
  query('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('status must be "active" or "inactive"'),
  query('locationType')
    .optional()
    .isIn(['city', 'country'])
    .withMessage('locationType must be "city" or "country"'),
  query('location')
    .optional()
    .isString()
    .withMessage('location must be string"')
];

export const checkBothLocationTypeAndLocation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { locationType, location } = req.query;

  if ((locationType && !location) || (!locationType && location)) {
    throw new BadRequestError(
      'Both locationType and location are required if one is present.'
    );
  }
  next();
};
