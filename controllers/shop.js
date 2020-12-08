const Product = require('../models/product');
const Cart = require('../models/cart');

// GET All Products --->
exports.getProducts = (req, res, next) => {
  // ::::: Callback (File SYSTEM) :::::
  // Product.fetchAll((products) => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products',
  //   });
  // });
  //
  // ::::: MYSQL :::::
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All Products',
        prods: rows,
      });
    })
    .catch((err) => console.log(err));
};

// GET Individual Product by Params and Id --->
exports.getProduct = (req, res, next) => {
  // ::::: Callback (File SYSTEM) :::::
  // const prodId = req.params.productId;
  // Product.findById(prodId, (product) => {
  // res.render('shop/product-detail', {
  //   product: product,
  //   pageTitle: product.title,
  //   path: '/products',
  // });
  // });
  //
  // ::::: MYSQL :::::
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        path: '/products',
        pageTitle: product.title,
        product: product[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET Homepage Products --->
exports.getIndex = (req, res, next) => {
  // ::::: Callback (File SYSTEM) :::::
  // Product.fetchAll((products) => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/',
  //   });
  // });
  //
  // ::::: MYSQL :::::
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Shop',
        prods: rows,
      });
    })
    .catch((err) => console.log(err));
};

// GET Cart Page --->
exports.getCart = (req, res, next) => {
  // Pasamos el Cart
  Cart.getCart((cart) => {
    // Ademas necesitamos info de los Products, de dicho cart:
    Product.fetchAll((products) => {
      const cartProducts = [];
      // Filtramos productos dentro del cart:
      for (product of products) {
        const cartProdData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProdData) {
          cartProducts.push({ productData: product, qty: cartProdData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
      });
    });
  });
};
// POST Cart Items --->
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
// POST Remove Item from Cart --->
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

// GET Orders Page --->
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};
//  GET Checkout Page --->
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
