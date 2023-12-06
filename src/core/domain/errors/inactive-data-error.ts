import { codeDbErrorInactive, codeError } from '../../shared/constants';
import { CustomError } from './custom-error';

export class InactiveDataError extends CustomError {
  statusCode = 400;

  constructor(public code?: Number) {
    super('Route not found');

    Object.setPrototypeOf(this, InactiveDataError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found', code: this.code??codeDbErrorInactive }];
  }
}
