const express = require('express');
const router = express.Router();

const {
  newOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/new').post(isAuthenticatedUser, newOrder);
router.route('/me').get(isAuthenticatedUser, getUserOrders);

router
  .route('/admin/all')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router
  .route('/admin/update/:order_id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

router.route('/:order_id').get(isAuthenticatedUser, getOrderById);

module.exports = router;
