// ---> Models <---
const Product = require('../models/product');

// ---> Middlewares <---
// GET --->
// Add Product:
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProd: true,
  });
};
// Products:
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      path: '/admin/products',
      pageTitle: 'Admin Products Page',
      prods: products,
    });
  });
};

// POST --->
// Add Product:
exports.postAddProduct = (req, res, next) => {
  // Products Destructure:
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // Saving:
  const product = new Product(title, imageUrl, price, description);
  product.save();
  // Redirect:
  res.redirect('/');
};
