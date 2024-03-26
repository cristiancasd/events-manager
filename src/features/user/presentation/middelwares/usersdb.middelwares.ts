import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  ServerError,
  codeDbCustoUserIdDuplicated,
  codeDbDocumentDuplicated,
  codeDbError
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

const { userUseCase } = configureDependencies();

export const checkUserNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { document, commerceUserId, commerceId, levelUid } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      if (!commerceId) throw new BadRequestError('commerceId invalid');
      if (!levelUid) throw new BadRequestError('levelUid invalid');
      const documentExist = await userUseCase.validateDuplicatedData(
        commerceId?.toString() ?? '',
        document,
        undefined
      );
      if (documentExist)
        throw new DataBaseError(
          'Duplicated document',
          codeDbDocumentDuplicated
        );

      const commerceUserIdExist = await userUseCase.validateDuplicatedData(
        commerceId?.toString() ?? '',
        undefined,
        commerceUserId
      );

      if (commerceUserIdExist)
        throw new DataBaseError(
          'Duplicated customCommerceId',
          codeDbCustoUserIdDuplicated
        );
    } catch (err) {
      if (err instanceof CustomError) {
        if (err instanceof DataBaseError) {
          if (err.code == codeDbError) return next();
        }
        throw err;
      }
      throw new ServerError();
    }
  }
  next();
};
