import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  ServerError,
  codeDbError,
  codeDbNameDuplicated,
  codeDbTypeIdDuplicated,
  commerceIdInvalidMessage,
  duplicatedNameMessage,
  duplicatedTypeIdMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

const { levelUseCase } = configureDependencies();

export const checkLevelNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, typeId, commerceUid } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      if (!commerceUid) throw new BadRequestError(commerceIdInvalidMessage);
      const nameExist = await levelUseCase.validateDuplicatedData(
        commerceUid?.toString() ?? '',
        name,
        undefined
      );
      if (nameExist)
        throw new DataBaseError(duplicatedNameMessage, codeDbNameDuplicated);
      const typeIdExist = await levelUseCase.validateDuplicatedData(
        commerceUid?.toString() ?? '',
        undefined,
        typeId
      );
      if (typeIdExist)
        throw new DataBaseError(
          duplicatedTypeIdMessage,
          codeDbTypeIdDuplicated
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
