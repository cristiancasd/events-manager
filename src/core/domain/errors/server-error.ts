import { CustomError, codeError } from "../..";

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
