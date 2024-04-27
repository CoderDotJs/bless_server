import configs from '../configs/configs.js';
import AppError from '../errors/AppError.js';
import handleCastError from '../errors/handleCastError.js';
import handleDuplicateError from '../errors/handleDuplicateError.js';
import handleValidationError from '../errors/handleValidationError.js';

const getErrorMessage = (errorDetails) => {
  let msg = '';
  errorDetails.forEach((f) => {
    msg += `${f.path} is ${f.message}. `;
  });
  return msg;
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandaller = (error, req, res, next) => {
  //defult values
  let statusCode = 500;
  let message = 'Something went to wrong !';
  let errorMessage = '';
  let errorDetails = [
    {
      path: '',
      message: 'something went to be wrong',
    },
  ];
  //Handle Mongoose Error such as unique true
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = getErrorMessage(simplifiedError.errorDetails);
    errorDetails = simplifiedError.errorDetails;
  }

  //CastError
  else if (error?.name == 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError.errorDetails;
  }

  //duplicate error 11000
  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = getErrorMessage(simplifiedError.errorDetails);
    errorDetails = simplifiedError.errorDetails;
  }
  //App Error
  else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorDetails = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  //error
  else if (error instanceof Error) {
    message = error?.message;
    errorDetails = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: configs.node_env === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandaller;
