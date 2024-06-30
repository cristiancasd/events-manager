import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  LevelUidInvalidMessage,
  ServerError,
  codeDbCustoUserIdDuplicated,
  codeDbDocumentDuplicated,
  codeDbError,
  commerceIdInvalidMessage,
  duplicatedCustomCommerceIdMessage,
  duplicatedDocumentMessage
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
  const { document, commerceUserId, commerceUid, levelUid, id } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      if (!commerceUid) throw new BadRequestError(commerceIdInvalidMessage);
      if (!levelUid) throw new BadRequestError(LevelUidInvalidMessage);

      let isEditRequest = false;
      if (req.method === 'PUT') {
        isEditRequest = true;
      }

      const documentExist = await userUseCase.validateDuplicatedData(
        commerceUid as string,
        isEditRequest as boolean,
        id as string | undefined,
        document as string,
        undefined
      );
      if (documentExist)
        throw new DataBaseError(
          duplicatedDocumentMessage,
          codeDbDocumentDuplicated
        );

      const commerceUserIdExist = await userUseCase.validateDuplicatedData(
        commerceUid as string,
        isEditRequest as boolean,
        id as string | undefined,
        undefined,
        commerceUserId
      );

      if (commerceUserIdExist)
        throw new DataBaseError(
          duplicatedCustomCommerceIdMessage,
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
