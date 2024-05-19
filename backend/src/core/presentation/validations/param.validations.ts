import { param, ValidationChain } from 'express-validator';
import { mustBeUidMessage } from '../../shared/constants';

// Param is UUiD validation
export const validateUUIDParam = (paramName: string): ValidationChain => {
  return param(paramName)
    .isUUID()
    .withMessage(`${paramName} ${mustBeUidMessage}`);
};
