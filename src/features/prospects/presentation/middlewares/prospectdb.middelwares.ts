import { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  ServerError,
  codeDbError,
  codeDbPhoneDuplicated,
  duplicatedPhoneMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';

const { prospectsUseCase } = configureDependencies();

export const checkPhoneExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commerceUid, phone, userCommerceUid,id:prospectId } = req.body;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let isEditRequest=false;
      if (req.method === 'PUT') {
        isEditRequest=true;
      } 
      const phonetExist = await prospectsUseCase.validateDuplicatedData(
          prospectId as string | undefined,
          phone as string,
          commerceUid as string
      )
      if (phonetExist)
        throw new DataBaseError(duplicatedPhoneMessage, codeDbPhoneDuplicated);
    } catch (err) {
      if (err instanceof CustomError) {
        if (err instanceof DataBaseError ) {
          if (err.code == codeDbError) return next();
        }
        throw err;
      }
      throw new ServerError();
    }
  }
  next();
};
