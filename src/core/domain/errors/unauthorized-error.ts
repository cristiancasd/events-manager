import { CustomError, codeError } from '../..';

// Custom error class for handling unauthorized errors
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor( public code?: Number) {
    super('Bad Credentials');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, code: this.code ?? codeError }];
  }
}
