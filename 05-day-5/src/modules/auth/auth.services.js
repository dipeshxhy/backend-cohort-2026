import { APIError } from '../../common/utils/api-error';
import {
  generateAccessToken,
  generateRawAndHashToken,
  generateRefreshToken,
  generateToken,
  hashToken,
  verifyRefreshToken,
} from '../../common/utils/jwt-utils';

const register = async ({ name, email, password }) => {
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    throw APIError.conflict(
      'Email already exists, please use a different email',
    );
  }
  const { token, hashedToken } = generateRawAndHashToken();
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const user = await User.create({
    name,
    email,
    password,
    verificationToken: hashedToken,
    verificationTokenExpires,
  });
  const userObj = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return userObj;
};

const login = async ({ email, password }) => {
  // check email exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw APIError.unauthorized('Invalid email or password');
  }
  if (!user.isVerified) {
    throw APIError.unauthorized('Email not verified, please verify your email');
  }
  // check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw APIError.unauthorized('Invalid email or password');
  }
  const accessToken = generateAccessToken({ id: user._id, role: user.role });

  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw APIError.unauthorized('Refresh token is required');
  }
  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded || !decoded.id) {
    throw APIError.unauthorized('Invalid refresh token');
  }

  const hashedToken = hashToken(refreshToken);

  const user = await User.findOne({
    _id: decoded.id,
    refreshToken: hashedToken,
  });

  if (!user) {
    throw APIError.unauthorized('User not found or invalid refresh token');
  }
  const newRefreshToken = generateRefreshToken({
    id: user._id,
    role: user.role,
  });
  user.refreshToken = hashToken(newRefreshToken);
  await user.save({ validateBeforeSave: false });
  const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
  return { accessToken: newAccessToken };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw APIError.notFound('User not found');
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
};

const forgot = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw APIError.notFound('User not found');
  }
  const { token, hashedToken } = generateRawAndHashToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  // send email with token
};

const reset = async (token, newPassword) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw APIError.unauthorized('Invalid or expired reset token');
  }
  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw APIError.notFound('User not found');
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export { register, login, refresh, logout, forgot, reset, getMe };
