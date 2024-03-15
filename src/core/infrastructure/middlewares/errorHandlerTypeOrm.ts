import { QueryFailedError } from "typeorm";
import { CustomError, DataBaseError, ServerError, codeDbError, codeDbErrorDuplicated, notFoundError } from "../..";

export const errorHandlerTypeOrm = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (error.driverError.code === '23505') {
                    throw new DataBaseError(': Error de duplicado', codeDbErrorDuplicated);
                }
                throw new DataBaseError('', codeDbError);
            }

            if (error instanceof CustomError) {
                console.log('llllerror',error)
                
                throw error;
            }

            throw new ServerError();

        }
    };
    return descriptor;
};



