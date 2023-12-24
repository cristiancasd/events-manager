import { CustomError, codeError } from "../..";


export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public code?: Number) {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found', code: this.code??codeError }];
  }
}
