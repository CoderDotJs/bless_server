import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    product: {
      type: String,
      required: [true, 'Name is required!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required!'],
    },
    paymentId: {
      type: String,
      required: [true, 'Payment Id is required!'],
    },
    client_secret: {
      type: String,
      required: [true, 'Client secret is required!'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    status: {
      type: String,
      required: [true, 'Status is required!'],
    },
  },
  { timestamps: true }
);

export const Order = model('Order', orderSchema);
