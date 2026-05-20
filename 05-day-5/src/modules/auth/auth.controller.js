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

const logout = async (req, res) => {
  await authServices.logout(req.user.id);
  return APIResponse.noContent(res, 'User logged out successfully');
};

const getMe = async (req, res) => {
  const user = await authServices.getMe(req.user.id);
  return APIResponse.ok(res, user, 'User profile retrieved successfully');
};

export { register, login, logout, getMe };
