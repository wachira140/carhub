const ProductModel = require("../models/motorModel");
const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require('../errors')

// create product
const createProduct = async (req, res) => {
  const user = await User.findOne({_id:req.user})

  if(!user){
    throw new CustomErrors.UnAuthorizedError('Not authorized to perform this task')
  }

  req.body.user = req.user
  const product = await ProductModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};



// get all products
const getAllProduct = async (req, res) => {
  const products = await ProductModel.find({});

  res.status(StatusCodes.OK).json({ products, count:products.length});
};

// get single product
const getSingleProduct = async (req, res) => {
  const {id} = req.params
  const product = await ProductModel.findOne({_id:id})
  if(!product){
    throw new CustomErrors.NotFoundError(`No item with id of:${id}`)
  }

  res.status(StatusCodes.OK).json({product})
};

// update product
const updateProduct = async (req, res) => {
  const {id:itemId} = req.params

  const product = await ProductModel.findOneAndUpdate({_id:itemId},
    req.body,{
      new:true,
      runValidators:true,
    })

    if(!product){
      throw new CustomErrors.NotFoundError(`No product with id of:${itemId}`)
    }
  res.status(StatusCodes.OK).json({product})
};

// delete product
const deleteProduct = async (req, res) => {
  const {id:itemId} = req.params

  const product = await ProductModel.findOneAndDelete({_id:itemId})
  if(!product){
    throw new CustomErrors.NotFoundError(`No product with id of:${itemId}`)
  }
  res.status(StatusCodes.OK).json({msg:`product of id: ${itemId} deleted successfully`})
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
