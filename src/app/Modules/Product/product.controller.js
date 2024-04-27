import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ProductServices } from './product.services.js';
import App from '../../../app.js';

const createProduct = catchAsync(async (req, res) => {
  let cloudinaryUpload = null;
  if (req?.files?.img) {
    cloudinaryUpload = await App.cloudinary.uploader.upload(
      req.files.img.buffer.toString('base64')
    );
  }
  const result = await ProductServices.createProductIntoDB({
    ...req.body,
    ...(cloudinaryUpload?.secure_url
      ? { img: cloudinaryUpload?.secure_url }
      : {}),
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  let cloudinaryUpload = null;
  if (req?.file) {
    cloudinaryUpload = await App.cloudinary.uploader.upload(
      req.file.buffer.toString('base64')
    );
  }
  const result = await ProductServices.updateProductIntoDB(req.params.id, {
    ...req.body,
    ...(cloudinaryUpload?.secure_url
      ? { img: cloudinaryUpload?.secure_url }
      : {}),
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});
const getProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
