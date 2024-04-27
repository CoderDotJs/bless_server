import { z } from 'zod';

const createUserValidation = z.object({
  name: z.string({ required_error: 'name is required' }),
  email: z.string({ required_error: 'email is required' }).email(),
  password: z
    .string({ required_error: 'password is required' })
    .regex(new RegExp('.*[A-Z].*'), 'needed atleast 1 uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'needed atleast 1 lowercase character')
    .regex(new RegExp('.*\\d.*'), 'needed atleast 1 number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'needed atleast 1 special character'
    )
    .min(8, 'need to be at least 8 characters in length'),

  role: z.enum(['user', 'admin'], { required_error: 'role is required' }),
});

export const userValidation = {
  createUserValidation,
};
