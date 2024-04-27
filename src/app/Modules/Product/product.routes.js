import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { productValidation } from './product.validation.js';
import { ProductControllers } from './product.controller.js';
import auth from '../../middlewares/auth.js';
import multer from 'multer';
const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/product',
  auth('admin'),
  validateRequest(productValidation.createProductValidation),
  upload.single('img'),
  ProductControllers.createProduct
);
router.get('/products', auth('admin', 'user'), ProductControllers.getProducts);
router.delete('/products/:id', auth('admin'), ProductControllers.deleteProduct);
router.patch(
  '/products/:id',
  auth('admin'),
  validateRequest(productValidation.createProductValidation),
  ProductControllers.updateProduct
);

export const ProductRouter = router;
