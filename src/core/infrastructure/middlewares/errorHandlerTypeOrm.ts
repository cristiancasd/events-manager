import { QueryFailedError } from 'typeorm';
import jwt from 'jsonwebtoken';

import {
  BadRequestError,
  CustomError,
  DataBaseError,
  ServerError,
  codeDbError,
  codeDbErrorDuplicated,
  codeInvalidToken,
  duplicatedDataMessage,
  invalidTokenMessage,
} from '../..';

// Error handler respository typeORM
export const errorHandlerTypeOrm = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === '23505') {
          throw new DataBaseError(
            ': ' + duplicatedDataMessage,
            codeDbErrorDuplicated
          );
        }
        throw new DataBaseError('', codeDbError);
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new BadRequestError(invalidTokenMessage, codeInvalidToken);
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new ServerError();
    }
  };
  return descriptor;
};
