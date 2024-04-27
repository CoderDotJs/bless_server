import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserServices } from './user.services.js';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.user._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User found successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
};
