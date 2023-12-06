import { param, ValidationChain } from 'express-validator';

export const validateUUIDParam = (paramName: string): ValidationChain => {
  return param(paramName).isUUID().withMessage(`${paramName} must be UID`);
};

// Otras funciones de validación si es necesario
