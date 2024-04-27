import { z } from 'zod';

const createProductValidation = z.object({
  name: z.string({ required_error: 'Name is required' }),
  desc: z.string({ required_error: 'Description is required' }),
  price: z.number({ required_error: 'Price is required' }),
  stock: z.number({ required_error: 'Stock is required' }),
});
const updateProductValidation = z.object({
  name: z.string({ required_error: 'Name is required' }).optional(),
  desc: z.string({ required_error: 'Description is required' }).optional(),
  price: z.number({ required_error: 'Price is required' }).optional(),
  stock: z.number({ required_error: 'Stock is required' }).optional(),
});

export const productValidation = {
  createProductValidation,
  updateProductValidation,
};
