class AppError extends Error {
  constructor(statusCode, message, stake = "") {
    super(message);
    this.statusCode = statusCode;
    if (stake) {
      this.stack = stake;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
