const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");



class unAuthorized extends Error {
  constructor(message) {
    super(message), (this.StatusCodes = StatusCodes.UNAUTHORIZED);
  }
}

module.exports = unAuthorized;
