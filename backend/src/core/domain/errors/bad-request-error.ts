import { CustomError, codeError } from '../..';

// Custom error class for handling bad request errors
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string, public code?: Number) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, code: this.code ?? codeError }];
  }
}
