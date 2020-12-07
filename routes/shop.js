const path = require('path');
const express = require('express');

const router = express.Router();

// ::::::::::::: Controllers :::::::::::::::::
const shopController = require('../controllers/shop');

// Routes:
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
