const Product = require('../models/product');
const express = require('express');
const router = express.Router();

// @route   GET api/products
// @desc    Getting all products
// @access  Public
const getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
};

// @route   GET api/products/:product_id
// @desc    Get product by id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @route   POST api/products/admin/new
// @desc    Creating new product
// @access  Private
const newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @route   PUT api/products/admin/:product_id
// @desc    Updating product
// @access  Private
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @route   DELETE api/products/admin/:product_id
// @desc    Delete product
// @access  Private
const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getProducts = getProducts;
exports.newProduct = newProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
