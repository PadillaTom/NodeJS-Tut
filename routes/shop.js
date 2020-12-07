const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../utils/path');
//Data:
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  // PATH --> Join will create the path dynamically to all OS.
  // Dirname: Direct straight to THIS folder, Views: folder, Shop.html: FILE
  const products = adminData.products;

  // To send PUG:
  res.render('shop', {
    prods: products,
    pageTitle: 'My HBS shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
  // To send HTML:
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
