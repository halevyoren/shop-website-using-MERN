const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @route   POST api/payment/process
// @desc    Process stripe payment
// @access  admin
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' }
  });

  res.status(200).json({
    sccess: true,
    client_Secret: paymentIntent.client_Secret
  });
});

// @route   GET api/stripeapi
// @desc    Process stripe payment
// @access  admin
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY
  });
});
