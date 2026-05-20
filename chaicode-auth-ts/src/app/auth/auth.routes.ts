import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateSchema } from '../../middleware/validate-schema.js';
import { userSignInSchema, userSignupSchema } from './schema.js';
import * as authMiddleware from './auth.middleware.js';

const authController = new AuthController();

const authRouter: Router = Router();

authRouter.post(
  '/sign-up',
  validateSchema(userSignupSchema),
  authController.handleSignUp.bind(authController),
);

authRouter.post(
  '/sign-in',
  validateSchema(userSignInSchema),
  authController.handleSignIn.bind(authController),
);

authRouter.get(
  '/me',
  authMiddleware.restrictToAuthenticated(),
  authController.getMe.bind(authController),
);

export default authRouter;
