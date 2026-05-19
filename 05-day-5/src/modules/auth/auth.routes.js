import { Router } from 'express';

import * as authController from './auth.controller.js';
import { validate } from '../../common/middleware/validate.middleware';
import * as authDto from './dto/auth.dto';

const authRouter = Router();

authRouter.post(
  '/register',
  validate(authDto.RegisterDto),
  authController.register,
);
authRouter.post('/login', validate(authDto.LoginDto), authController.login);

export default authRouter;
