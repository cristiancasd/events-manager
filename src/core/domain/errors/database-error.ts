import { CustomError, codeError } from "../..";


export class DataBaseError extends CustomError {
  statusCode = 400;

  constructor(public message: string, public code?: Number) {
    super(message);

    Object.setPrototypeOf(this, DataBaseError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Data Base Error' + this.message, code: this.code ?? codeError }];
  }
}
