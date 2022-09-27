const CustomErrors = require("../errors")
const {
    decode
}= require("../utils/jwt")


const authenticateUser = async(req, res, next)=>{
    const token = req.headers.authorization
    try {
            if (!token.startsWith('Bearer')){

                throw new CustomErrors.UnAuthorizedError("The token is invalid")
            }

            const undecodedToken = token.split(" ")[1]
            const payload = decode(undecodedToken)
             
            req.user = payload.id
        
        next()
    } catch (error) {
        throw new CustomErrors.UnAuthorizedError('Auntentication failed')
    }
}

module.exports = {
    authenticateUser
}