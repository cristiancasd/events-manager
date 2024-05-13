/**
 * Abstract class for defining custom errors.
 * Extends the native JavaScript Error class.
 */

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
    code: Number;
  }[];
}
