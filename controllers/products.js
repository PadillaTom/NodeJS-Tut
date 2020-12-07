// ---> Models <---
const Product = require('../models/product');

// ---> Middlewares <---

// GET Add Product Middleware:
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProd: true,
  });
};

// POST Add Product:
exports.postAddProduct = (req, res, next) => {
  // Products Data:
  const product = new Product(req.body.title);
  product.save();
  // Redirect:
  res.redirect('/');
};

// GET products in Homepage:
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'My EJS shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
