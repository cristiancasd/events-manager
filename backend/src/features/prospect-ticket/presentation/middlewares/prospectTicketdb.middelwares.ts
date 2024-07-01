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

const { prospectTicketUseCase } = configureDependencies();

export const checkRelationProspectTicketMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prospectUid, eventUid, id } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let isEditRequest = false;
      if (req.method === 'PUT') {
        isEditRequest = true;
      }
      const nameExist = await prospectTicketUseCase.validateDuplicatedData(
        prospectUid as string,
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
