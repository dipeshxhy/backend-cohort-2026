import type { Response } from 'express';
import { HttpStatus } from '../types/statuscode.js';
export class APIResponse<T> {
  private message: string;
  private data: T | null;
  constructor(message: string, data: T | null) {
    this.message = message;
    this.data = data;
  }

  static ok<T>(res: Response, data: T, message = 'Success') {
    return res.status(HttpStatus.OK).json(new APIResponse(message, data));
  }
  static created<T>(
    res: Response,
    data: T,
    message = 'Resource created successfully',
  ) {
    return res.status(HttpStatus.CREATED).json(new APIResponse(message, data));
  }
  static noContent(res: Response, message = 'No content') {
    return res
      .status(HttpStatus.NO_CONTENT)
      .json(new APIResponse(message, null));
  }
}
