import { type ZodIssue } from 'zod';
import { CustomError } from './custom-error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class RequestValidationError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(readonly validationError: ZodIssue[]) {
    super(ReasonPhrases.BAD_REQUEST);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const errors = this.validationError.map((error) => ({
      message: error.message,
      param: error.path.join('.'),
    }));

    return { errors };
  }
}
