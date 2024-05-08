import httpStatus from 'http-status';
import AppError from '../../errors/AppError.js';
import { Order } from './order.model.js';
import { Product } from '../Product/product.model.js';
import Stripe from 'stripe';
const stripe = Stripe(
  'sk_test_51JwjCnF8dfRkp5sRpRrS6KjcqhpsJieqj0CzbmuaUZD4fDUdLIKslaGFg8gEQr7v7qrrBTXhyDuOMFGXrNiNPKCw00jR8mpv4q'
);

const createOrder = async (id, userId) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw AppError(400, 'Product not found!');
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const newOrder = await Order.create({
      product: id,
      user: userId,
      paymentId: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      price: product.price,
      status: paymentIntent.status,
    });

    return newOrder;
  } catch (err) {
    throw AppError(httpStatus[500], err.message);
  }
};

const completeOrder = async (orderId) => {
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: 'succeeded',
      },
      { new: true }
    );

    return order;
  } catch (err) {
    throw AppError(500, err.message);
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);

    const paymentIntent = await stripe.paymentIntents.cancel(order.paymentId);

    order.status = paymentIntent.status;

    await order.save();

    return order;
  } catch (err) {
    throw AppError(500, err.message);
  }
};

const getOrders = async (userId) => {
  try {
    const products = await Order.find({ user: userId }).populate('product');
    return products;
  } catch (err) {
    throw AppError(httpStatus[500], err.message);
  }
};

export const OrderServices = {
  createOrder,
  cancelOrder,
  completeOrder,
  getOrders,
};
