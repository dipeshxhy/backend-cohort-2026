import { APIError } from '../../common/utils/api-error';

const authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw APIError.unauthorized(
      'Token is requires, must be sent in Authorization header as Bearer token',
    );
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw APIError.unauthorized('User not found');
    }
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    throw APIError.unauthorized('Invalid or expired token');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      throw APIError.forbidden(
        'You do not have permission to access this resource',
      );
    }
    next();
  };
};
export { authenticate, authorize };
