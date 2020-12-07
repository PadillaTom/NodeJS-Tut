const path = require('path');
const express = require('express');
const router = express.Router();

// ::::::::::::: Controllers :::::::::::::::::
const adminController = require('../controllers/admin');

// ::::::: Routes :::::::::

//  ---> GET <---
// /admin/add-product
router.get('/add-product', adminController.getAddProduct);
// /admin/products
router.get('/products', adminController.getProducts);

// ---> POST <---
// /admin/add-product
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
