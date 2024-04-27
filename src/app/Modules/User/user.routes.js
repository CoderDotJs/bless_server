import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { userValidation } from './user.validation.js';
import { UserControllers } from './user.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.createUserValidation),
  UserControllers.createUser
);

router.get('/me', auth('admin', 'user'), UserControllers.createUser);

export const UserRouter = router;
