class ValidationError extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.statusCode = 400;
    this.message = message;
  }
}
module.exports = ValidationError;
