import { CustomError, codeError } from '../..';

// Custom error class for handling not found errors
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string, public code?: Number) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, code: this.code ?? codeError }];
  }
}
