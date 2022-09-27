const jwt = require('jsonwebtoken')
const customError = require('../errors/customError')

const signToken = (payload)=>{

    return jwt.sign(payload, process.env.Jwt_secret,{
        expiresIn: "1h"
    })
}

const decode = (token)=>{
    const decodedToken = jwt.verify(token, process.env.Jwt_secret)

    if (!decodedToken){
        throw new customError.UnAuthorizedError('invalid token')
    }

    return decodedToken
}

module.exports = {
    signToken,
    decode
}