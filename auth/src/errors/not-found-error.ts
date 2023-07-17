import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor() {
    super(ReasonPhrases.NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      errors: [
        {
          message: this.message,
        },
      ],
    };
  }
}
