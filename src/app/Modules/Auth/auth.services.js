import jwt from 'jsonwebtoken';
import configs from '../../configs/configs.js';
import AppError from '../../errors/AppError.js';
import httpStatus from 'http-status';
import { User } from '../User/user.model.js';

const loginUser = async (payload) => {
  const isUserExist = await User.isUserExists(payload.email);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
  }

  //password and compaire
  const isPasswordMatched = await User.isPasswordMatch(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match !');
  }

  //create toke and send to the client
  const jwtPayload = {
    _id: isUserExist._id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, configs.jwt_access_secret, {
    expiresIn: '10d',
  });

  return {
    user: isUserExist,
    token: accessToken,
  };
};
const AuthServices = {
  loginUser,
};
export default AuthServices;
