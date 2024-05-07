const catchAsync = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((error) => {
      return next(error);
    });
  };
};
export default catchAsync;
