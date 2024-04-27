import express from 'express';
const app = express();
import cors from 'cors';
import { AuthRouts } from './app/Modules/Auth/auth.routes.js';
// import notFound from './app/middlewares/notFound.mjs';
import globalErrorHandaller from './app/middlewares/globalErrorHandaller.js';
import httpStatus from 'http-status';
import { UserRouter } from './app/Modules/User/user.routes.js';
import { v2 as cloudinaryV2 } from 'cloudinary';
import configs from './app/configs/configs.js';
import { ProductRouter } from './app/Modules/Product/product.routes.js';
import bodyParser from 'body-parser'; // Configure multer storage
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const cloudinary = cloudinaryV2.config({
  cloud_name: configs.cloudinary_name,
  api_key: configs.cloudinary_api_key,
  api_secret: configs.cloudinary_secret_key,
});

app.use(upload.none());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', AuthRouts);
app.use('/api', UserRouter);
app.use('/api', ProductRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: ' ',
  });
});
app.use(globalErrorHandaller);

export default app;
