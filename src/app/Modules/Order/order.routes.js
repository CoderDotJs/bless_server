import express from 'express';
import auth from '../../middlewares/auth.js';
import { OrderControllers } from './order.controller.js';
const router = express.Router();

router.post('/order', auth('admin', 'user'), OrderControllers.createOrder);
router.post(
  '/order-complete/:id',
  auth('admin', 'user'),
  OrderControllers.completeOrder
);
router.post(
  '/order-cancel/:id',
  auth('admin', 'user'),
  OrderControllers.cancelOrder
);
router.get('/orders', auth('admin', 'user'), OrderControllers.getOrders);

export const OrderRouter = router;
