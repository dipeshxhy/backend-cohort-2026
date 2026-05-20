import type { NextFunction, Request, Response } from 'express';
import { APIError } from '../utils/api-error.js';

const sendErrorDev = (err: APIError, res: Response): void => {
  res.status(err.statusCode).json({
    success: err.success,
    errors: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: APIError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
    });
  } else {
    console.log('Error 💥', err);
    res.status(err.statusCode).json({
      success: err.success,
      message: 'Something went wrong!',
    });
  }
};

const handleJWTError = (): APIError =>
  new APIError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (): APIError =>
  new APIError('Your token has expired! Please log in again.', 401);
export const globalErrorHandler = (
  err: APIError | any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error('Error 💥', err);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }
    sendErrorProd(error, res);
  }
};
