const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

// Homepage:
router.get('/', shopController.getIndex);

// Products:
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);

// Cart:
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// Order:
router.get('/orders', shopController.getOrders);

// Checkout:
router.get('/checkout', shopController.getCheckout);

module.exports = router;
