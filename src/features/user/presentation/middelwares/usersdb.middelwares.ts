import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  LevelUidInvalidMessage,
  ServerError,
  codeDbCustoUserIdDuplicated,
  codeDbDocumentDuplicated,
  codeDbError,
  commerceIdInvalidMessage
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
  const { document, commerceUserId, commerceUid, levelUid } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      console.log('aqui 1');
      if (!commerceUid) throw new BadRequestError(commerceIdInvalidMessage);
      if (!levelUid) throw new BadRequestError(LevelUidInvalidMessage);
      const documentExist = await userUseCase.validateDuplicatedData(
        commerceUid as string,
        document as string,
        undefined
      );
      console.log('aqui 11')
      if (documentExist)
        throw new DataBaseError(
          'Duplicated document',
          codeDbDocumentDuplicated
        );
      console.log('aqui 2');

      const commerceUserIdExist = await userUseCase.validateDuplicatedData(
        commerceUid?.toString() ?? '',
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
