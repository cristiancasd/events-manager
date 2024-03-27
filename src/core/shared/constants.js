"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustBeUidMessage = exports.somethingWrongMessage = exports.invalidTokenMessage = exports.LevelUidInvalidMessage = exports.commerceIdInvalidMessage = exports.duplicatedTypeIdMessage = exports.duplicatedNameMessage = exports.duplicatedPhoneMessage = exports.duplicatedEmailMessage = exports.duplicatedDataMessage = exports.errorMessageUserNotFound = exports.errorMessageEventNotFound = exports.errorMessageLevelNotFound = exports.errorMessageCommerceNotFound = exports.errorRouteNotFound = exports.codeInvalidToken = exports.codeUserNotFound = exports.codeEventNotFound = exports.codeLevelNotFound = exports.codeCommerceNotFound = exports.codeDbCustoUserIdDuplicated = exports.codeDbDocumentDuplicated = exports.codeDbTypeIdDuplicated = exports.codeDbEmailDuplicated = exports.codeDbPhoneDuplicated = exports.codeDbNameDuplicated = exports.codeDbErrorInactive = exports.codeDbErrorDuplicated = exports.codeDbError = exports.codeError = exports.notFoundError = exports.passwordRegex = exports.CommerceUserRoles = exports.OptionsValidations = exports.CriteriaOptionsStatus = exports.CriteriaOptionsLocation = void 0;
var CriteriaOptionsLocation;
(function (CriteriaOptionsLocation) {
    CriteriaOptionsLocation["city"] = "city";
    CriteriaOptionsLocation["country"] = "country";
})(CriteriaOptionsLocation || (exports.CriteriaOptionsLocation = CriteriaOptionsLocation = {}));
var CriteriaOptionsStatus;
(function (CriteriaOptionsStatus) {
    CriteriaOptionsStatus["active"] = "active";
    CriteriaOptionsStatus["inactive"] = "inactive";
})(CriteriaOptionsStatus || (exports.CriteriaOptionsStatus = CriteriaOptionsStatus = {}));
var OptionsValidations;
(function (OptionsValidations) {
    OptionsValidations["name"] = "name";
    OptionsValidations["phone"] = "phone";
    OptionsValidations["email"] = "email";
})(OptionsValidations || (exports.OptionsValidations = OptionsValidations = {}));
var CommerceUserRoles;
(function (CommerceUserRoles) {
    CommerceUserRoles["superAdmin"] = "super-admin";
    CommerceUserRoles["admin"] = "admin";
    CommerceUserRoles["user"] = "user";
    CommerceUserRoles["other"] = "other";
})(CommerceUserRoles || (exports.CommerceUserRoles = CommerceUserRoles = {}));
/// En resumen, esta expresión regular establece condiciones para garantizar que una contraseña
/// cumpla con ciertos criterios de seguridad, como la inclusión de al menos una letra mayúscula,
/// una letra minúscula, un dígito y un carácter no alfanumérico. También se asegura de que no haya
/// caracteres especiales o saltos de línea al principio y permite cualquier combinación de caracteres
/// después de cumplir con los requisitos anteriores
exports.passwordRegex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.notFoundError = 400;
exports.codeError = 600;
exports.codeDbError = 700;
exports.codeDbErrorDuplicated = 701;
exports.codeDbErrorInactive = 702;
exports.codeDbNameDuplicated = 703;
exports.codeDbPhoneDuplicated = 704;
exports.codeDbEmailDuplicated = 705;
exports.codeDbTypeIdDuplicated = 706;
exports.codeDbDocumentDuplicated = 707;
exports.codeDbCustoUserIdDuplicated = 708;
exports.codeCommerceNotFound = 801;
exports.codeLevelNotFound = 802;
exports.codeEventNotFound = 803;
exports.codeUserNotFound = 804;
exports.codeInvalidToken = 901;
//Not found messages
exports.errorRouteNotFound = 'Commerce not found';
exports.errorMessageCommerceNotFound = 'Commerce not found';
exports.errorMessageLevelNotFound = 'Level not found';
exports.errorMessageEventNotFound = 'Event not found';
exports.errorMessageUserNotFound = 'User not found';
// Duplicated messages
exports.duplicatedDataMessage = 'Duplicated data';
exports.duplicatedEmailMessage = 'Duplicated email';
exports.duplicatedPhoneMessage = 'Duplicated phone';
exports.duplicatedNameMessage = 'Duplicated name';
exports.duplicatedTypeIdMessage = 'Duplicated typeId';
// Invalid data message
exports.commerceIdInvalidMessage = 'CommerceId invalid';
exports.LevelUidInvalidMessage = 'levelUid invalid';
exports.invalidTokenMessage = 'Token invalido';
exports.somethingWrongMessage = 'Something went wrong';
exports.mustBeUidMessage = 'must be UID';
