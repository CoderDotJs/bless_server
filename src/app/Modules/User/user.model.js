import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import configs from '../../configs/configs.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: 0,
    },
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.statics.isUserExists = async (email) => {
  return await User.findOne({ email }).select('+password');
};
userSchema.statics.isUserExistsById = async (id) => {
  return await User.findById(id).select('+password');
};

userSchema.statics.isPasswordMatch = async (
  plainTextPassword,
  hasedPassword
) => {
  return await bcrypt.compare(plainTextPassword, hasedPassword);
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(configs.bcrypt_solt_round)
  );

  next();
});

export const User = model('User', userSchema);
