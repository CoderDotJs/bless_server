import express from 'express';
const router = express.Router();
import AuthController from './auth.controller.js';
import { AuthValidation } from './auth.validation.js';
import validateRequest from '../../middlewares/validateRequest.js';

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRouts = router;
