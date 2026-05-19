import { APIError } from '../../common/utils/api-error';
import { generateRawAndHashToken } from '../../common/utils/jwt-utils';

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

export { register };
