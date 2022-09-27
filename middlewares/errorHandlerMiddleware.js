const { StatusCodes } = require("http-status-codes");

const erroHandlerMiddleware = (err, req, res, next) => {
  let message = err.message;
  let statusCodes = err.StatusCodes;

  if(err.name === 'ValidationError'){
    message = Object.values(err.errors).map((msg)=>msg.message).join(',')
    statusCodes = 400
  }

  if (err.name === 'CastError'){
    // message = err.message
    message = `No item for id ${err.value}`
    statusCodes = 400
  }

 if (err.name === 'TypeError'){
  message = err.message
  statusCodes = 400
 }
 
 
if (err.name === 'ReferenceError'){
  message = err.message
  statusCodes = 400
}


if (err.name === 'Error'){
  message = err.message
  statusCodes = 400
}


// console.log(err.name)
if (err.name === 'JsonWebTokenError'){
  message = err.message
  statusCodes = 400
}

  res.status(statusCodes).json({ msg: message });
};

module.exports = erroHandlerMiddleware;
