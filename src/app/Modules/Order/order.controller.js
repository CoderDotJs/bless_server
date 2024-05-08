import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { OrderServices } from './order.services.js';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(
    req.body.product,
    req.user._id
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order created successfully',
    data: result,
  });
});
const completeOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.completeOrder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order completed successfully',
    data: result,
  });
});
const cancelOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.cancelOrder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order cancelled successfully',
    data: result,
  });
});
const getOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrders(req.user._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order found successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  completeOrder,
  cancelOrder,
  getOrders,
};
