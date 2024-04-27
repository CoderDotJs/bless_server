const handleDuplicateError = (error) => {
  const match = error.message.match(/"(.*?)"/);
  const extedMessage = match && match[1];

  const errorDetails = [
    {
      path: "",
      message: `${extedMessage} is Already Exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error",
    errorMessage: `{VALUE} is not a valid ID`,
    errorDetails,
  };
};
export default handleDuplicateError;
