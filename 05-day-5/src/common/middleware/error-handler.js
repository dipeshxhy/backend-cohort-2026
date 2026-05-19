import { APIError } from '../utils/api-error.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.error || null,
    });
  }
  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err,
  });
};
