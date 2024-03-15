export { DataBaseError } from "./domain/errors/database-error";
export { CustomError } from './domain/errors/custom-error';
export { RequestValidationError } from './domain/errors/request-validation-result';
export { ServerError } from './domain/errors/server-error';
export { CriteriaOptionsStatus, CriteriaOptionsLocation, OptionsValidations, 
    codeDbEmailDuplicated, codeDbNameDuplicated, codeDbPhoneDuplicated, 
    errorMessageCommerceNotFound, errorMessageLevelNotFound, notFoundError,
     codeEventNotFound, errorMessageEventNotFound, errorRouteNotFound,
     codeUserNotFound, errorMessageUserNotFound,
    } from './shared/constants';
export { NotFoundError } from './domain/errors/not-found-error';
export { InactiveDataError } from './domain/errors/inactive-data-error';

export { BadRequestError } from './domain/errors/bad-request-error';

export { errorHandlerTypeOrm } from './infrastructure/middlewares/errorHandlerTypeOrm';
export { validateRequest } from './presentation/middlewares/validate-request';

export { codeDbCustoUserIdDuplicated, codeDbDocumentDuplicated, codeCommerceNotFound, codeError, codeDbErrorInactive, codeDbError, codeDbErrorDuplicated, codeLevelNotFound } from './shared/constants';

export { errorHandlerUseCase } from "./application/middlewares/errorHandlerUseCase";
export { errorHandler } from './presentation/middlewares/error-handler';


export { validateUUIDParam } from './presentation/validations/param.validations';


