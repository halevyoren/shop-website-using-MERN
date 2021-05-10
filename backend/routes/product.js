const express = require('express');
const router = express.Router();

//Getting all the functions for the routes
const {
  newProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Getting all products
router.route('/').get(getProducts);

// Get product by id
router.route('/:product_id').get(getProductById);

// Update product by id
router.route('/admin/:product_id').put(updateProduct);

// Delete product by id
router.route('/admin/:product_id').delete(deleteProduct);

// Creating new product
router.route('/admin/new').post(newProduct);

module.exports = router;
