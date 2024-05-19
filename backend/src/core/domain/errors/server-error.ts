import { CustomError, codeError } from '../..';

// Custom error class for handling server errors
export class ServerError extends CustomError {
  statusCode = 500;
  constructor(public code?: Number) {
    super('');
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Internal Server Error', code: this.code ?? codeError }];
  }
}
