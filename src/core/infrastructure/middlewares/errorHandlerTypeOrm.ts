import { QueryFailedError } from "typeorm";
import { DataBaseError, ServerError, codeDbError, codeDbErrorDuplicated } from "../..";

export const errorHandlerTypeOrm = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error) {
            // Aquí puedes manejar los errores de manera coherente
            if (error instanceof QueryFailedError) {
                if (error.driverError.code === '23505') {
                    throw new DataBaseError(': Error de duplicado', codeDbErrorDuplicated);
                }
                throw new DataBaseError('', codeDbError);
            } else {
                throw new ServerError();
            }
        }
    };
    return descriptor;
};



