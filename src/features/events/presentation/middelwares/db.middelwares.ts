import express, { NextFunction, Request, Response } from 'express';
import { CustomError, DataBaseError,  ServerError,  codeDbError, codeDbNameDuplicated } from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';

const { eventsUseCase } = configureDependencies();

export const checkEventNameMiddleware = async (req: Request, res: Response, next: NextFunction,) => {

    const { name } = req.body;
    const { commerceId } = req.params;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const nameExist = await eventsUseCase.validateDuplicatedData(commerceId, name);
            if (nameExist)
                throw new DataBaseError('Duplicated Name', codeDbNameDuplicated);

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