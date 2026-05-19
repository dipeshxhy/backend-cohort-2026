import { APIResponse } from '../../common/utils/api-response.js';
import * as authServices from './auth.services.js';
const register = async (req, res) => {
  const user = await authServices.register(req.body);
  return APIResponse.created(res, user, 'User registered successfully');
};

const login = async (req, res) => {
  const user = await authServices.login(req.body);
  return APIResponse.ok(res, user, 'User logged in successfully');
};

export { register, login };
