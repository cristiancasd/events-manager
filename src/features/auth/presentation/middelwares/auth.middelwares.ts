import express, { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  DataBaseError,
  LevelUidInvalidMessage,
  ServerError,
  codeDbCustoUserIdDuplicated,
  codeDbDocumentDuplicated,
  codeDbError,
  codeInvalidRole,
  codeInvalidToken,
  commerceIdInvalidMessage,
  invalidRoleMessage,
  invalidTokenMessage
} from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';
import { CommerceUserRoles } from '../../../../core/shared/constants';

const { authUseCase } = configureDependencies();

export const checkTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {

      const token = req.headers['authorization'];
      const isValidToken = await authUseCase.validateToken(token ?? '');
      if (isValidToken) {
        return next();
      } else {
        throw new BadRequestError(invalidTokenMessage, codeInvalidToken);
      }
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  }
  next();
};


export const validateRolesMiddleware = (roles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {

      const token = req.headers['authorization'];
      const tokenData = await authUseCase.getTokenData(token ?? '');

      if (roles.includes(tokenData.role)) {
        return next();
      }

      throw new BadRequestError(invalidRoleMessage, codeInvalidRole);

    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  }
  next();
};

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {

      const token = req.headers['authorization'];
      const tokenData = await authUseCase.getTokenData(token ?? '');

      if (tokenData.role == CommerceUserRoles.admin || tokenData.role == CommerceUserRoles.superAdmin) {
        return next();
      }

      throw new BadRequestError(invalidRoleMessage, codeInvalidRole);

    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  }
  next();
};

