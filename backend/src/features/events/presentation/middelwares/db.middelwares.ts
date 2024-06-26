import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  ServerError,
  codeDbError,
  codeDbNameDuplicated,
  commerceIdInvalidMessage,
  duplicatedNameMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

const { eventsUseCase } = configureDependencies();

export const checkEventNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, commerceUid, id } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      if (!commerceUid) throw new BadRequestError(commerceIdInvalidMessage);

      let isEditRequest = false;
      if (req.method === 'PUT') {
        isEditRequest = true;
      }

      const nameExist = await eventsUseCase.validateDuplicatedData(
        commerceUid?.toString() ?? '',
        name,
        id as string | undefined,
        isEditRequest
      );

      if (nameExist)
        throw new DataBaseError(duplicatedNameMessage, codeDbNameDuplicated);
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
