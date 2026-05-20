import type { NextFunction, Request, Response } from 'express';
import type z from 'zod';
import { HttpStatus } from '../types/statuscode.js';

export const validateSchema = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      let errors = parsed.error.flatten().fieldErrors;
      errors = Object.fromEntries(
        Object.entries(errors).map(([field, messages]) => [
          field,
          Array.isArray(messages) ? messages.join(', ') : '',
        ]),
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid request body',
        errors: errors,
      });
    }
    req.body = parsed.data;
    next();
  };
};
