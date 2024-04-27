const handleValidationError = (error) => {
  const errorDetails = Object.values(error.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage: `{VALUE} is required`,
    errorDetails,
  };
};

export default handleValidationError;
