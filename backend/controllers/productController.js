const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// @route   GET api/products
// @desc    Getting all products
// @access  Public
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;

  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  const filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productCount,
    resPerPage,
    filteredProductsCount,
    products
  });
});

// @route   GET api/products/admin/all
// @desc    Getting all products from everyone (Admin)
// @access  Private
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  });
});

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
  let images = [];
  // if only one image is uploaded then it will be received as a string else it will be an array
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];
  
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'shop/products'
    });

    imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
    })
}

  req.body.images = imagesLinks;
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

  // Deleting images associated with the products
  for(let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }

  product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted'
  });
});

// @route   POST api/review
// @desc    Creating new review
// @access  Private
const createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  // checking if user has already created a review for this product
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});

// @route   GET api/products/reviews
// @desc    Get product reviews
// @access  Private
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews;

  res.status(200).json({
    success: true,
    reviews
  });
});

// @route   DELETE api/products/review
// @desc    Delete product review
// @access  Private
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString()
  );

  const numberOfReviews = reviews.length;

  const ratings =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    success: true
  });
});

exports.getProducts = getProducts;
exports.getAdminProducts = getAdminProducts;
exports.newProduct = newProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createReview = createReview;
exports.getProductReviews = getProductReviews;
exports.deleteReview = deleteReview;
