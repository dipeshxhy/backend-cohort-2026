import type { Application } from 'express';
import express from 'express';
import { globalErrorHandler } from '../middleware/error-handler.js';
import { APIError } from '../utils/api-error.js';
import authRouter from './auth/auth.routes.js';
import { authenticationMiddleware } from './auth/auth.middleware.js';

export function createServerApplication(): Application {
  const app = express();
  app.use(express.json());
  app.use(authenticationMiddleware());

  app.get('/health', (req, res) => {
    res.sendStatus(200).end();
  });

  // routes
  app.use(authRouter);

  // !not found route handler

  app.use('/*splat', (req, res) => {
    throw APIError.notFound(`Route ${req.method} ${req.originalUrl} not found`);
  });

  app.use(globalErrorHandler);

  return app;
}
