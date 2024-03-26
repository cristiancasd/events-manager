import { ValidationError } from 'express-validator';
import { CustomError, codeError } from '../..';

// Custom error class for handling request validation errors
export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param, code: codeError };
    });
  }
}
