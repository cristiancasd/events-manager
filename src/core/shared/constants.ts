export enum CriteriaOptionsLocation {
  city = 'city',
  country = 'country'
}

export enum CriteriaOptionsStatus {
  active = 'active',
  inactive = 'inactive'
}

export enum OptionsValidations {
  name = 'name',
  phone = 'phone',
  email = 'email'
}

export enum CommerceUserRoles {
  superAdmin = 'super-admin',
  admin = 'admin',
  user = 'user',
  other = 'other'
}

/// En resumen, esta expresión regular establece condiciones para garantizar que una contraseña
/// cumpla con ciertos criterios de seguridad, como la inclusión de al menos una letra mayúscula,
/// una letra minúscula, un dígito y un carácter no alfanumérico. También se asegura de que no haya
/// caracteres especiales o saltos de línea al principio y permite cualquier combinación de caracteres
/// después de cumplir con los requisitos anteriores
export const passwordRegex =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const notFoundError = 400;
export const codeError = 600;

// DB code errors
export const codeDbError = 700;
export const codeDbErrorDuplicated = 701;
export const codeDbErrorInactive = 702;

export const codeDbNameDuplicated = 703;
export const codeDbPhoneDuplicated = 704;
export const codeDbEmailDuplicated = 705;
export const codeDbTypeIdDuplicated = 706;
export const codeDbDocumentDuplicated = 707;
export const codeDbCustoUserIdDuplicated = 708;


// not found code errors

export const codeCommerceNotFound = 801;
export const codeLevelNotFound = 802;
export const codeEventNotFound = 803;
export const codeUserNotFound = 804;

// invalid code errors
export const codeInvalidToken=901;
export const codeInvalidRole=902;


//Not found messages
export const errorRouteNotFound = 'Commerce not found';
export const errorMessageCommerceNotFound = 'Commerce not found';
export const errorMessageLevelNotFound = 'Level not found';
export const errorMessageEventNotFound = 'Event not found';
export const errorMessageUserNotFound = 'User not found';

// Duplicated messages
export const duplicatedDataMessage = 'Duplicated data';
export const duplicatedEmailMessage = 'Duplicated email';
export const duplicatedPhoneMessage = 'Duplicated phone';
export const duplicatedNameMessage = 'Duplicated name';
export const duplicatedTypeIdMessage = 'Duplicated typeId';

// Invalid data message
export const commerceIdInvalidMessage = 'CommerceId invalid';
export const LevelUidInvalidMessage = 'levelUid invalid';
export const invalidTokenMessage = 'Token invalido';

export const somethingWrongMessage = 'Something went wrong';
export const mustBeUidMessage = 'must be UID';

export const invalidRoleMessage= 'You role is invalid';



