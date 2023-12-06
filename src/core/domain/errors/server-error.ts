import { codeError } from '../../shared/constants';
import { CustomError } from './custom-error';

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public code?: Number) {
    super('');

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Internal Server Error', code:this.code??codeError}];
  }
}
