"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUIDParam = exports.errorHandler = exports.errorHandlerUseCase = exports.codeLevelNotFound = exports.codeDbErrorDuplicated = exports.codeDbError = exports.codeDbErrorInactive = exports.codeError = exports.codeCommerceNotFound = exports.codeDbDocumentDuplicated = exports.codeDbCustoUserIdDuplicated = exports.validateRequest = exports.errorHandlerTypeOrm = exports.BadRequestError = exports.UnauthorizedError = exports.InactiveDataError = exports.NotFoundError = exports.invalidTokenMessage = exports.codeInvalidToken = exports.LevelUidInvalidMessage = exports.commerceIdInvalidMessage = exports.duplicatedTypeIdMessage = exports.duplicatedNameMessage = exports.duplicatedEmailMessage = exports.duplicatedPhoneMessage = exports.duplicatedDataMessage = exports.errorMessageUserNotFound = exports.codeUserNotFound = exports.errorRouteNotFound = exports.errorMessageEventNotFound = exports.codeEventNotFound = exports.notFoundError = exports.errorMessageLevelNotFound = exports.errorMessageCommerceNotFound = exports.codeDbTypeIdDuplicated = exports.codeDbPhoneDuplicated = exports.codeDbNameDuplicated = exports.codeDbEmailDuplicated = exports.OptionsValidations = exports.CriteriaOptionsLocation = exports.CriteriaOptionsStatus = exports.ServerError = exports.RequestValidationError = exports.CustomError = exports.DataBaseError = void 0;
var database_error_1 = require("./domain/errors/database-error");
Object.defineProperty(exports, "DataBaseError", { enumerable: true, get: function () { return database_error_1.DataBaseError; } });
var custom_error_1 = require("./domain/errors/custom-error");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return custom_error_1.CustomError; } });
var request_validation_result_1 = require("./domain/errors/request-validation-result");
Object.defineProperty(exports, "RequestValidationError", { enumerable: true, get: function () { return request_validation_result_1.RequestValidationError; } });
var server_error_1 = require("./domain/errors/server-error");
Object.defineProperty(exports, "ServerError", { enumerable: true, get: function () { return server_error_1.ServerError; } });
var constants_1 = require("./shared/constants");
Object.defineProperty(exports, "CriteriaOptionsStatus", { enumerable: true, get: function () { return constants_1.CriteriaOptionsStatus; } });
Object.defineProperty(exports, "CriteriaOptionsLocation", { enumerable: true, get: function () { return constants_1.CriteriaOptionsLocation; } });
Object.defineProperty(exports, "OptionsValidations", { enumerable: true, get: function () { return constants_1.OptionsValidations; } });
Object.defineProperty(exports, "codeDbEmailDuplicated", { enumerable: true, get: function () { return constants_1.codeDbEmailDuplicated; } });
Object.defineProperty(exports, "codeDbNameDuplicated", { enumerable: true, get: function () { return constants_1.codeDbNameDuplicated; } });
Object.defineProperty(exports, "codeDbPhoneDuplicated", { enumerable: true, get: function () { return constants_1.codeDbPhoneDuplicated; } });
Object.defineProperty(exports, "codeDbTypeIdDuplicated", { enumerable: true, get: function () { return constants_1.codeDbTypeIdDuplicated; } });
Object.defineProperty(exports, "errorMessageCommerceNotFound", { enumerable: true, get: function () { return constants_1.errorMessageCommerceNotFound; } });
Object.defineProperty(exports, "errorMessageLevelNotFound", { enumerable: true, get: function () { return constants_1.errorMessageLevelNotFound; } });
Object.defineProperty(exports, "notFoundError", { enumerable: true, get: function () { return constants_1.notFoundError; } });
Object.defineProperty(exports, "codeEventNotFound", { enumerable: true, get: function () { return constants_1.codeEventNotFound; } });
Object.defineProperty(exports, "errorMessageEventNotFound", { enumerable: true, get: function () { return constants_1.errorMessageEventNotFound; } });
Object.defineProperty(exports, "errorRouteNotFound", { enumerable: true, get: function () { return constants_1.errorRouteNotFound; } });
Object.defineProperty(exports, "codeUserNotFound", { enumerable: true, get: function () { return constants_1.codeUserNotFound; } });
Object.defineProperty(exports, "errorMessageUserNotFound", { enumerable: true, get: function () { return constants_1.errorMessageUserNotFound; } });
Object.defineProperty(exports, "duplicatedDataMessage", { enumerable: true, get: function () { return constants_1.duplicatedDataMessage; } });
Object.defineProperty(exports, "duplicatedPhoneMessage", { enumerable: true, get: function () { return constants_1.duplicatedPhoneMessage; } });
Object.defineProperty(exports, "duplicatedEmailMessage", { enumerable: true, get: function () { return constants_1.duplicatedEmailMessage; } });
Object.defineProperty(exports, "duplicatedNameMessage", { enumerable: true, get: function () { return constants_1.duplicatedNameMessage; } });
Object.defineProperty(exports, "duplicatedTypeIdMessage", { enumerable: true, get: function () { return constants_1.duplicatedTypeIdMessage; } });
Object.defineProperty(exports, "commerceIdInvalidMessage", { enumerable: true, get: function () { return constants_1.commerceIdInvalidMessage; } });
Object.defineProperty(exports, "LevelUidInvalidMessage", { enumerable: true, get: function () { return constants_1.LevelUidInvalidMessage; } });
Object.defineProperty(exports, "codeInvalidToken", { enumerable: true, get: function () { return constants_1.codeInvalidToken; } });
Object.defineProperty(exports, "invalidTokenMessage", { enumerable: true, get: function () { return constants_1.invalidTokenMessage; } });
var not_found_error_1 = require("./domain/errors/not-found-error");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return not_found_error_1.NotFoundError; } });
var inactive_data_error_1 = require("./domain/errors/inactive-data-error");
Object.defineProperty(exports, "InactiveDataError", { enumerable: true, get: function () { return inactive_data_error_1.InactiveDataError; } });
var unauthorized_error_1 = require("./domain/errors/unauthorized-error");
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return unauthorized_error_1.UnauthorizedError; } });
var bad_request_error_1 = require("./domain/errors/bad-request-error");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return bad_request_error_1.BadRequestError; } });
var errorHandlerTypeOrm_1 = require("./infrastructure/middlewares/errorHandlerTypeOrm");
Object.defineProperty(exports, "errorHandlerTypeOrm", { enumerable: true, get: function () { return errorHandlerTypeOrm_1.errorHandlerTypeOrm; } });
var validate_request_1 = require("./presentation/middlewares/validate-request");
Object.defineProperty(exports, "validateRequest", { enumerable: true, get: function () { return validate_request_1.validateRequest; } });
var constants_2 = require("./shared/constants");
Object.defineProperty(exports, "codeDbCustoUserIdDuplicated", { enumerable: true, get: function () { return constants_2.codeDbCustoUserIdDuplicated; } });
Object.defineProperty(exports, "codeDbDocumentDuplicated", { enumerable: true, get: function () { return constants_2.codeDbDocumentDuplicated; } });
Object.defineProperty(exports, "codeCommerceNotFound", { enumerable: true, get: function () { return constants_2.codeCommerceNotFound; } });
Object.defineProperty(exports, "codeError", { enumerable: true, get: function () { return constants_2.codeError; } });
Object.defineProperty(exports, "codeDbErrorInactive", { enumerable: true, get: function () { return constants_2.codeDbErrorInactive; } });
Object.defineProperty(exports, "codeDbError", { enumerable: true, get: function () { return constants_2.codeDbError; } });
Object.defineProperty(exports, "codeDbErrorDuplicated", { enumerable: true, get: function () { return constants_2.codeDbErrorDuplicated; } });
Object.defineProperty(exports, "codeLevelNotFound", { enumerable: true, get: function () { return constants_2.codeLevelNotFound; } });
var errorHandlerUseCase_1 = require("./application/middlewares/errorHandlerUseCase");
Object.defineProperty(exports, "errorHandlerUseCase", { enumerable: true, get: function () { return errorHandlerUseCase_1.errorHandlerUseCase; } });
var error_handler_1 = require("./presentation/middlewares/error-handler");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return error_handler_1.errorHandler; } });
var param_validations_1 = require("./presentation/validations/param.validations");
Object.defineProperty(exports, "validateUUIDParam", { enumerable: true, get: function () { return param_validations_1.validateUUIDParam; } });