import { CustomError, codeError } from "../..";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string, public code?: Number) {

    //constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    //return [{ message: this.message , code: codeError}];
    return [{ message: this.message, code: this.code ?? codeError }];

  }
}
