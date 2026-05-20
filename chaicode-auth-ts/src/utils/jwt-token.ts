import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const generateSalt = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const createHash = (password: string, salt: string): string => {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};
interface JWTPayload {
  userId: string;
}
const SignJWT = (payload: JWTPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

const verifyJWT = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { createHash, generateSalt, SignJWT, verifyJWT };
