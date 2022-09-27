const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class badRequest extends customError {
  constructor(message) {
    super(message), (this.StatusCodes = StatusCodes.BAD_REQUEST);
  }
}

// class badRequest extends Error {
//   constructor(message) {
//     super(message), (this.StatusCodes = StatusCodes.BAD_REQUEST);
//   }
// }

module.exports = badRequest;
