import express, { NextFunction, Request, Response } from 'express';
import { CustomError, DataBaseError, ServerError, codeDbError, codeDbNameDuplicated } from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';
import { codeDbTypeIdDuplicated } from '../../../../core/shared/constants';

const { levelUseCase } = configureDependencies();

export const checkLevelNameMiddleware = async (req: Request, res: Response, next: NextFunction,) => {

    const { name, typeId, commerceId } = req.body;


    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            if (!commerceId) throw new BadRequestError('commerceId invalid');
            const nameExist = await levelUseCase.validateDuplicatedData(commerceId?.toString() ?? '', name, undefined);
            if (nameExist)
                throw new DataBaseError('Duplicated Name', codeDbNameDuplicated);
            const typeIdExist = await levelUseCase.validateDuplicatedData(commerceId?.toString() ?? '', undefined, typeId);
            if (typeIdExist)
                throw new DataBaseError('Duplicated typeId', codeDbTypeIdDuplicated);

        } catch (err) {
            if (err instanceof CustomError) {
                if (err instanceof DataBaseError) {
                    if (err.code == codeDbError) return next();
                }
                throw err
            }
            throw new ServerError();
        }
    }
    next();
};