import { User } from './user.model.js';

const createUserIntoDB = async (payload) => {
  const result = await User.create(payload);
  return result;
};

const getMe = async (id) => {
  const user = await User.findById(id).select(
    '-__v -createdAt -updatedAt -password'
  );
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getMe,
};
