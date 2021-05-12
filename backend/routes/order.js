const express = require('express');
const router = express.Router();

const {
  newOrder,
  getOrderById,
  getUserOrders
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/new').post(isAuthenticatedUser, newOrder);
router.route('/me').get(isAuthenticatedUser, getUserOrders);
router.route('/:order_id').get(isAuthenticatedUser, getOrderById);

module.exports = router;
