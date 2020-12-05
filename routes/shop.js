const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../utils/path');

router.get('/', (req, res, next) => {
  // PATH --> Join will create the path dynamically to all OS.
  // Dirname: Direct straight to THIS folder, Views: folder, Shop.html: FILE
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
