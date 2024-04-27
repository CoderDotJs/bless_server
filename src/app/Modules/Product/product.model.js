import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required!'],
    },
  },
  { timestamps: true }
);

export const Product = model('Product', productSchema);
