import { APIError } from '../utils/api-error';

export const validate = (DtoClass) => {
  return (req, res, next) => {
    try {
      const { error, value } = DtoClass.validate(req.body);
      if (error) {
        throw APIError.badRequest(error);
      }
      req.body = value;
      next();
    } catch (error) {
      throw APIError.validationError(error.message);
    }
  };
};
