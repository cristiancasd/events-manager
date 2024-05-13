import { CustomError, codeError } from '../..';

// Custom error class for handling unauthorized errors
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string, public code?: Number) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, code: this.code ?? codeError }];
  }
}
