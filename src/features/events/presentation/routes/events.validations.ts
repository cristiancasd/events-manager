

import { query, body, ValidationChain } from 'express-validator';

export const validateCreateEventBody: ValidationChain[] = [
  body('name').isString().withMessage('name must be String'),
  body('phone').isNumeric().withMessage('phone must be number'),
  body('email').isEmail().withMessage('email must be email'),
  body('countryCode').isString().withMessage('country must be String'),
  body('city').isString().withMessage('city must be String'),
  body('totalFreePrevent').isNumeric().withMessage('totalFreePrevent must be number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be bool'),
  body('dateFinish').isString().withMessage('dateFinish must be date'),
];






export const validateFindEvents: ValidationChain[] = [
  query('finishDate').optional().isDate().withMessage('finishDate must be a valid date')
    .custom((value) => {
      if (value) {
        const finishDate = new Date(value);
        const currentDate = new Date();
        if (finishDate >= currentDate) {
          throw new Error('startDate must be a date more recent than finishDate');
        }
      }
      return true;
    }),

  query('startDate')
    .optional()
    .isDate().withMessage('startDate must be a valid date')
    .custom((value, { req }) => {
      if (req.query?.finishDate) {
        const finishDate = req.query.finishDate as string;
        if (value && finishDate) {
          const startDate = new Date(value);
          const endDate = new Date(finishDate);
          if (startDate >= endDate) {
            throw new Error('startDate must be a date more recent than finishDate');
          }
        }
      }
      return true;
    }),

];

