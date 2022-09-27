const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt')




const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Email not a valid email",
    },
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "Please provide valid password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "merchant", "supervisor", "admin"],
    default: "user",
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  verification_token: String,

  verification_date: {
    type: Date,
  },
  password_token: String,
  password_expiration_date: Date,

    // required for a merchant
  country: {
    type: String,
    default: "Kenya",
  },
  city: {
    type: String,
    required:function(){
      return this.role == 'merchant'
    },
    maxlength: 20,
  },
  location: {
    type: String,
    required: function(){
      return this.role == 'merchant'
    },
  },
  // po box
  address: String,
  contacts: {
    type: [],
    required: function(){
      return this.role == 'merchant'
    },
  },

  socials: {
    type: [],
  },
  website: {
    type: String,
    default: "ourownsite.com",
  },
  merchant_type: {
    type: String,
    enum: ["importer", "local dealer", "others"],
    default: "others",
    required:function(){
      return this.role == 'merchant'
    },
  },
  subscription: {
    type: Boolean,
    default: false,
  },
});

// hash password method
UserSchema.pre('save', async function(){
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

// compare password
UserSchema.methods.comparePassword = async function(plain_password){
  const matching = await bcrypt.compare(plain_password, this.password)
  return matching
}




module.exports = mongoose.model("User", UserSchema);
