export { DataBaseError } from './domain/errors/database-error';
export { CustomError } from './domain/errors/custom-error';
export { RequestValidationError } from './domain/errors/request-validation-result';
export { ServerError } from './domain/errors/server-error';
export {
  CriteriaOptionsStatus,
  CriteriaOptionsLocation,
  OptionsValidations,
  codeInvalidCommerceUid,
  invalidCommerceUidMessage,
  duplicatedCustomCommerceIdMessage,
  duplicatedDocumentMessage,
  codeInvalidRole,
  invalidRoleMessage,
  codeDbEmailDuplicated,
  codeDbNameDuplicated,
  codeDbNickDuplicated,
  codeDbPhoneDuplicated,
  codeDbTypeIdDuplicated,
  errorMessageCommerceNotFound,
  errorMessageLevelNotFound,
  notFoundError,
  codeEventNotFound,
  errorMessageEventNotFound,
  errorRouteNotFound,
  codeUserNotFound,
  errorMessageUserNotFound,
  codeUserCoreNotFound,
  errorMessageUserCoreNotFound,
  duplicatedDataMessage,
  duplicatedPhoneMessage,
  duplicatedEmailMessage,
  duplicatedNickMessage,
  duplicatedNameMessage,
  duplicatedTypeIdMessage,
  commerceIdInvalidMessage,
  LevelUidInvalidMessage,
  codeInvalidToken,
  invalidTokenMessage,
  badCredentialsMessage,
  inactiveProfileMessage
} from './shared/constants';
export { NotFoundError } from './domain/errors/not-found-error';
export { InactiveDataError } from './domain/errors/inactive-data-error';
export { UnauthorizedError } from './domain/errors/unauthorized-error';

export { BadRequestError } from './domain/errors/bad-request-error';

export { errorHandlerTypeOrm } from './infrastructure/middlewares/errorHandlerTypeOrm';
export { validateRequest } from './presentation/middlewares/validate-request';

export {
  codeDbCustoUserIdDuplicated,
  codeDbDocumentDuplicated,
  codeCommerceNotFound,
  codeError,
  codeDbErrorInactive,
  codeDbError,
  codeDbErrorDuplicated,
  codeLevelNotFound
} from './shared/constants';

export { errorHandlerUseCase } from './application/middlewares/errorHandlerUseCase';
export { errorHandler } from './presentation/middlewares/error-handler';

export { validateUUIDParam } from './presentation/validations/param.validations';
