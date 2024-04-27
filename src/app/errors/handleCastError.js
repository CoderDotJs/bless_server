const handleCastError = (error) => {
  const statusCode = 404;
  const errorDetails = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  return {
    statusCode,
    message: "Invalid ID",
    errorMessage: `${error.value} is not a valid ID!`,
    errorDetails,
  };
};

export default handleCastError;
