import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class GenericError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(readonly message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message);
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, GenericError.prototype);
  }

  serializeErrors = () => ({
    errors: [
      {
        message: this.message,
      },
    ],
  });
}
