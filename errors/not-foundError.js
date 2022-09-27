const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class notFoundError extends customError {
  constructor(message) {
    super(message), (this.StatusCodes = StatusCodes.NOT_FOUND);
  }
}
module.exports = notFoundError;
