import { HttpStatus } from '../types/statuscode.js';

export class APIError extends Error {
  public isOperational: boolean;
  public success: boolean;

  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
  static badRequest(message: string = 'Bad Request'): APIError {
    return new APIError(message, HttpStatus.BAD_REQUEST);
  }

  static unauthorized(message: string = 'Unauthorized'): APIError {
    return new APIError(message, HttpStatus.UNAUTHORIZED);
  }

  static conflict(message: string = 'Conflict'): APIError {
    return new APIError(message, HttpStatus.CONFLICT);
  }

  static forbidden(message: string = 'Forbidden'): APIError {
    return new APIError(message, HttpStatus.FORBIDDEN);
  }

  static notFound(message: string = 'Not Found'): APIError {
    return new APIError(message, HttpStatus.NOT_FOUND);
  }

  static internal(message: string = 'Internal Server Error'): APIError {
    return new APIError(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
