import joi from 'joi';
import { APIError } from '../utils/api-error';
export class BaseDto {
  static schema = joi.object();

  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(', ');

      return {
        error: errorMessage,
        value: null,
      };
    }
    return {
      error: null,
      value,
    };
  }
}
