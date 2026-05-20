import crypto from 'crypto';
import jw from 'jsonwebtoken';
import { APIError } from './api-error';

export const generateToken = (payload, secret, expiresIn) => {
  return jw.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  try {
    return jw.verify(token, secret);
  } catch (error) {
    throw APIError.validationError('Invalid token');
  }
};

export const generateAccessToken = (payload) => {
  return generateToken(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  );
};

export const verifyAccessToken = (token) => {
  return verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return verifyToken(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

export const generateRefreshToken = (payload) => {
  return generateToken(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  );
};

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateRawAndHashToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  return { token, hashedToken };
};
