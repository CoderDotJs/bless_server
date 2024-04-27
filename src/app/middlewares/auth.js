import httpStatus from 'http-status';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import configs from '../configs/configs.js';

const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'No JWT is provided in the request headers'
      );
    }

    //chek is valid token or not
    jwt.verify(token, configs.jwt_access_secret, function (err, decoded) {
      if (err?.name == 'TokenExpiredError') {
        throw new AppError(
          419,
          'The provided JWT (JSON Web Token) has expired'
        );
      }
      if (err?.message == 'invalid token') {
        throw new AppError(
          400,
          'The user is attempting to access a resource without the necessary authorization'
        );
      }
      if (err?.message == 'jwt malformed') {
        throw new AppError(419, 'The JWT provided is invalid or malformed');
      }
      if (decoded) {
        // as JwtPayload
        const { role } = decoded;

        //check if the user is Authorized
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            'The user does not possess the required permissions for the requested action or resource'
          );
        }
        req.user = decoded;
        next();
      }
    });
  });
};

export default auth;
