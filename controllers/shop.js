// ---> Models <---
const Product = require('../models/product');

// ---> Middlewares <---
// GET Index:
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      path: '/',
      pageTitle: 'My EJS shop',
      prods: products,
    });
  });
};
// GET Products:
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'All Products',
      prods: products,
    });
  });
};
// GET Product wih PARAMS:
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      path: '/products',
      pageTitle: product.title,
      product: product,
    });
  });
};
// GET Cart:
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};
// GET orders:
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};
// GET Checkout:
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout'),
    {
      path: '/checkout',
      pageTitle: 'Checkout Page',
    };
};
