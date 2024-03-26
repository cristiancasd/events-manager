import { codeDbErrorInactive } from '../..';
import { CustomError } from './custom-error';

//TODO: refactor this. Message
// Custom error class for handling inactive errors
export class InactiveDataError extends CustomError {
  statusCode = 400;

  constructor(public code?: Number) {
    super('Route not found');

    Object.setPrototypeOf(this, InactiveDataError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found', code: this.code ?? codeDbErrorInactive }];
  }
}
