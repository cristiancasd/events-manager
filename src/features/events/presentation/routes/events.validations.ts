import { query, body, ValidationChain } from 'express-validator';

export const validateCreateEventBody: ValidationChain[] = [
  body('name').isString().withMessage('name must be String'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be string'),
  body('date').isString().withMessage('date must be Date'),
  body('url').optional().isURL().withMessage('url must be a URL'),
  body('commerceId').isUUID().withMessage('commerceId must be UUID')
];

export const validateFindEvents: ValidationChain[] = [
  query('finishDate')
    .optional()
    .isDate()
    .withMessage('finishDate must be a valid date')
    .custom((value) => {
      if (value) {
        const finishDate = new Date(value);
        const currentDate = new Date();
        if (finishDate >= currentDate) {
          throw new Error(
            'startDate must be a date more recent than finishDate'
          );
        }
      }
      return true;
    }),

  query('startDate')
    .optional()
    .isDate()
    .withMessage('startDate must be a valid date')
    .custom((value, { req }) => {
      if (req.query?.finishDate) {
        const finishDate = req.query.finishDate as string;
        if (value && finishDate) {
          const startDate = new Date(value);
          const endDate = new Date(finishDate);
          if (startDate >= endDate) {
            throw new Error(
              'startDate must be a date more recent than finishDate'
            );
          }
        }
      }
      return true;
    })
];
