import type { Request, Response, NextFunction } from 'express';
import { APIError } from '../../utils/api-error.js';
import { verifyJWT } from '../../utils/jwt-token.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}
const authenticationMiddleware = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return next();
    if (!header.startsWith('Bearer ')) {
      throw APIError.badRequest('authorization header must start with Bearer');
    }
    const token = header.split(' ')[1];
    if (!token) {
      throw APIError.badRequest('authorization token missing');
    }
    const decoded = verifyJWT(token);

    req.user = decoded as {
      userId: string;
    };
    next();
  };
};

const restrictToAuthenticated = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw APIError.unauthorized('You must be logged in to access this route');
    }
    next();
  };
};

export { authenticationMiddleware, restrictToAuthenticated };
