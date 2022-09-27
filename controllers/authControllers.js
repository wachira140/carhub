const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const CustomErrors = require("../errors/index");
const {
  signToken
}= require("../utils/jwt")

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new CustomErrors.BadRequestError("Please provide all fields");
  }

  const emailExists = await User.findOne({ email });
  
  if (emailExists) {
    throw new CustomErrors.BadRequestError("Email already exists");
  }

  const createAdmin = (await User.countDocuments({})) === 0;
  req.body.role  = createAdmin? 'admin': role


  
  const verification_token = crypto.randomBytes(40).toString("hex");

  req.body.verification_token = verification_token


  // send verification email

  const user = await User.create(req.body);


  res.status(StatusCodes.CREATED).json({ user });
};



const loginUser = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password){
    throw new CustomErrors.BadRequestError('All credentials required!')
  }

  const user = await User.findOne({email})

  if(!user){
    throw new CustomErrors.UnAuthorizedError("Not authorized")
  }

  const isPasswordMatching = await user.comparePassword(password)
  if (!isPasswordMatching){
    throw new CustomErrors.UnAuthorizedError('Wrong password')
  }

  const is_verified = user.is_verified
  if (!is_verified){
    throw new CustomErrors.UnAuthorizedError("Your email is not verified")
  }

  // respond with cookies

  const payload = {name:user.name,id:user._id, role:user.role}

  const token = signToken(payload)
  
  res.status(StatusCodes.ACCEPTED).json({token})
};

const logoutUser = async (req, res) => {
 
  res.send("logout user");
};



const forgotPassword = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({email})

  if (user){
    const passwordToken = crypto.randomBytes(50).toString("hex");
  
    const hours = 1000 * 60 * 10
    const passwordExpirationDate = new Date(Date.now() + hours)

    user.password_expiration_date = passwordExpirationDate
    user.password_token = passwordToken

    // send password  reset email

    await user.save()
  }
  res.status(StatusCodes.OK).json({token:user.password_token})
};



const resetPassword = async (req, res) => {
  const { email, newPassword, passwordToken } = req.body

  if(!email || !newPassword || !passwordToken){
    throw new CustomErrors.BadRequestError('Provide all credentials')
  }

  
  const user = await User.findOne({email})
  if(user){
    const currentDate= new Date()

    if(!user.password_expiration_date > currentDate){
      throw new CustomErrors.BadRequestError('Password token expired. Please reset again')
    }


    if(user.password_token === passwordToken && user.password_expiration_date > currentDate ){
      user.password = newPassword
      user.password_token = null
      user.password_expiration_date  = null
      await user.save()
    }
  }
  res.status(StatusCodes.OK).json('Your password has been reset successfully!')
};




const updateUser = async (req, res) => {
  res.send("update user");
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser,
};
