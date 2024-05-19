import { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  ServerError,
  codeDbError,
  codeDbNameDuplicated,
  codeDbPhoneDuplicated,
  duplicatedNameMessage,
  duplicatedPhoneMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';

const { userTicketUseCase } = configureDependencies();

export const checkRelationUserTicketMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userCommerceUid, eventUid, id } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let isEditRequest = false;
      if (req.method === 'PUT') {
        isEditRequest = true;
      }
      const nameExist = await userTicketUseCase.validateDuplicatedData(
        userCommerceUid as string,
        eventUid as string,
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
