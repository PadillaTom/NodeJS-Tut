const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../utils/path');
//Data:
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  // PATH --> Join will create the path dynamically to all OS.
  // Dirname: Direct straight to THIS folder, Views: folder, Shop.html: FILE
  console.log(adminData.products);

  // To send PUG:
  res.render('shop');
  // To send HTML:
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
