import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  OptionsValidations,
  RequestValidationError,
  ServerError,
  codeDbEmailDuplicated,
  codeDbError,
  codeDbNameDuplicated,
  codeDbPhoneDuplicated,
  duplicatedEmailMessage,
  duplicatedPhoneMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
const { commerceUseCase } = configureDependencies();

export const checkCommerceNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const nameExist = await commerceUseCase.validateDuplicatedData(
        OptionsValidations.name,
        name
      );
      if (nameExist)
        throw new DataBaseError(duplicatedEmailMessage, codeDbNameDuplicated);
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

export const checkCommercePhoneMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const phoneExist = await commerceUseCase.validateDuplicatedData(
        OptionsValidations.phone,
        phone
      );

      if (phoneExist)
        throw new DataBaseError(duplicatedPhoneMessage, codeDbPhoneDuplicated);
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

export const checkCommerceEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const emailExist = await commerceUseCase.validateDuplicatedData(
        OptionsValidations.email,
        email
      );
      if (emailExist) {
        throw new DataBaseError('Duplicated Email', codeDbEmailDuplicated);
      }
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
