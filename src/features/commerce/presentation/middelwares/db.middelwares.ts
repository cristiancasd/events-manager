import express, { NextFunction, Request, Response } from 'express';
import { CustomError, DataBaseError, OptionsValidations, ServerError, codeDbEmailDuplicated, codeDbNameDuplicated, codeDbPhoneDuplicated } from '../../../../core';
import { validationResult } from 'express-validator';
import { CommerceUseCase } from '../../application/commerceUseCase';
import { TypeOrmCommerceRepository } from '../../infrastructure/repository/typeOrm.repository';


export const checkCommerceNameMiddleware = async (req: Request, res: Response, next: NextFunction,) => {
    const { name, email, phone } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const commerceRepo = new TypeOrmCommerceRepository(); // To use db Dynamo
            const commerceUseCase = new CommerceUseCase(commerceRepo);

            const nameExist = await commerceUseCase.validateDuplicatedData(OptionsValidations.name, name);
            if (nameExist) {
                const err = new DataBaseError('', codeDbNameDuplicated);
                return next(err);
            }

            const phoneExist = await commerceUseCase.validateDuplicatedData(OptionsValidations.phone, phone);
            if (phoneExist) {
                const err = new DataBaseError('', codeDbPhoneDuplicated);
                return next(err);
            }

            const emailExist = await commerceUseCase.validateDuplicatedData(OptionsValidations.email, email);
            if (emailExist) {
                const err = new DataBaseError('', codeDbEmailDuplicated);
                return next(err);
            }

        } catch (err) {
            if (err instanceof CustomError) {
                return next(err);
            }
            return next(new ServerError());
        }

    }

    next();
};