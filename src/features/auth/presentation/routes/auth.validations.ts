import { body, header, ValidationChain } from 'express-validator';

export const validateSigInBody: ValidationChain[] = [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isString().withMessage('invalid password'),
];

export const validateRefreshTokenBody: ValidationChain[] = [
  body('refreshToken').isString().withMessage('invalid refresh token format'),
];

export const validateTokenBody: ValidationChain[] = [
  header('Authorization').isString().withMessage('Token missing or invalid format'),
];
