const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');

// @route   GET api/products
// @desc    Getting all products
// @access  Public
const getProducts = async (req, res, next) => {
  const resPerPage = 4;

  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(4);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products
  });
};

// @route   GET api/products/:product_id
// @desc    Get product by id
// @access  Public
const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.product_id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(201).json({
    success: true,
    product
  });
});

// @route   POST api/products/admin/new
// @desc    Creating new product
// @access  Private
const newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});

// @route   PUT api/products/admin/:product_id
// @desc    Updating product
// @access  Private
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.product_id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.product_id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  });
});

// @route   DELETE api/products/admin/:product_id
// @desc    Delete product
// @access  Private
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.product_id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted'
  });
});

exports.getProducts = getProducts;
exports.newProduct = newProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
