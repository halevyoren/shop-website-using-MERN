const express = require('express');
const router = express.Router();

//Getting all the functions for the routes
const {
  newProduct,
  getProducts,
  getAdminProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createReview,
  getProductReviews,
  deleteReview
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Getting all products
router.route('/').get(getProducts);

// Getting all products
router.route('/admin/all').get(getAdminProducts);

// Update product by id
router
  .route('/admin/:product_id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

// Delete product by id
router
  .route('/admin/:product_id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Creating new product
router
  .route('/admin/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

// Creating new review
router.route('/review').put(isAuthenticatedUser, createReview);

// Getting product reviews
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

// Deleting review review
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

// Get product by id
router.route('/:product_id').get(getProductById);

module.exports = router;
