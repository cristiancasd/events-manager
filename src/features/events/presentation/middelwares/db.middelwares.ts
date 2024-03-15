import express, { NextFunction, Request, Response } from 'express';
import { CustomError, DataBaseError, ServerError, codeDbError, codeDbNameDuplicated } from '../../../../core';
import { validationResult } from 'express-validator';
import { configureDependencies } from '../../../../config';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

const { eventsUseCase } = configureDependencies();

export const checkEventNameMiddleware = async (req: Request, res: Response, next: NextFunction,) => {

    const { name, commerceId } = req.body;


    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {

            if (!commerceId) throw new BadRequestError('commerceId invalid');
            const nameExist = await eventsUseCase.validateDuplicatedData(commerceId?.toString() ?? '', name);

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