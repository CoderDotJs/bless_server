import httpStatus from 'http-status';

const sendResponse = (res, data) => {
  const json = {
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
  };

  if (data?.meta) {
    json.meta = data.meta;
  }
  if (data?.data) {
    json.data = data.data;
  }

  res.status(httpStatus.OK).json(json);
};

export default sendResponse;
