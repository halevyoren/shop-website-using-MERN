const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// @route   POST api/order/new
// @desc    Creating new order
// @access  Private
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(200).json({
    success: true,
    order
  });
});

// @route   GET api/orders/:order_id
// @desc    Get order by id
// @access  Private
const getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.order_id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No order was found with this id', 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// @route   GET api/orders/me
// @desc    Get order by user
// @access  Private
const getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders
  });
});

// @route   GET api/orders/admin
// @desc    Get all orders
// @access  admin
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
});

exports.newOrder = newOrder;
exports.getOrderById = getOrderById;
exports.getUserOrders = getUserOrders;
exports.getAllOrders = getAllOrders;
