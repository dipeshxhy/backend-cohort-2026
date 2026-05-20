import { Router } from 'express';

import * as authController from './auth.controller.js';
import { validate } from '../../common/middleware/validate.middleware';
import * as authDto from './dto/auth.dto';
import { authenticate } from './auth.middleware.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validate(authDto.RegisterDto),
  authController.register,
);
authRouter.post('/login', validate(authDto.LoginDto), authController.login);

authRouter.get('/me', authenticate, authController.getMe);

authRouter.post('/logout', authenticate, authController.logout);

export default authRouter;
