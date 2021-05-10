const Product = require('../models/product');

// @route   Post api/products/new
// @desc    Creating new product
// @access  Public
const newProduct = async (req, res, nex) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
};

// @route   GET api/products
// @desc    Getting all products
// @access  Public
const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'this route wil show all products in database'
  });
};

exports.getProducts = getProducts;
exports.newProduct = newProduct;
