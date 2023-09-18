// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Update order status by ID
router.patch('/orders/:orderId', orderController.updateOrderStatus);

// Get today's orders
router.get('/orders/today', orderController.getTodayOrders);

// Get today's orders by status
router.get('/orders/today/:status', orderController.getTodayOrdersByStatus);

// Calculate daily selling price for delivered orders with a date parameter
router.get('/orders/selling-price/daily/:date', orderController.calculateDailySellingPrice);

// Calculate monthly selling price for delivered orders with a date parameter
router.get('/orders/selling-price/monthly/:date', orderController.calculateMonthlySellingPrice);


module.exports = router;
