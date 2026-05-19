export class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = true; // To distinguish between operational errors and programming errors
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request') {
    return new APIError(message, 400);
  }

  static notFound(message = 'Not Found') {
    return new APIError(message, 404);
  }
  static unauthorized(message = 'Unauthorized') {
    return new APIError(message, 401);
  }
  static forbidden(message = 'Forbidden') {
    return new APIError(message, 403);
  }
  static conflict(message = 'Conflict') {
    return new APIError(message, 409);
  }
  static unprocessableEntity(message = 'Unprocessable Entity') {
    return new APIError(message, 422);
  }
  static tooManyRequests(message = 'Too Many Requests') {
    return new APIError(message, 429);
  }

  static validationError(message = 'Validation Error') {
    return new APIError(message, 422);
  }

  static internal(message = 'Internal Server Error') {
    return new APIError(message, 500);
  }
}
