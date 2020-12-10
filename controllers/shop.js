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
  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render('shop/product-list', {
  //       path: '/products',
  //       pageTitle: 'All Products',
  //       prods: rows,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  //
  // :::::: SEQUELIZE ::::::
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All Products',
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
  // const prodId = req.params.productId;
  // Product.findById(prodId)
  //   .then(([product]) => {
  //     res.render('shop/product-detail', {
  //       path: '/products',
  //       pageTitle: product.title,
  //       product: product[0],
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: SEQUELIZE ::::::
  const prodId = req.params.productId;
  // Product.findAll({ where: {id: prodId} }).then().catch()
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        path: '/products',
        pageTitle: product.title,
        product: product,
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
  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render('shop/index', {
  //       path: '/',
  //       pageTitle: 'Shop',
  //       prods: rows,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  //
  // :::::: SEQUELIZE ::::::
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Shop',
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET Cart Page --->
exports.getCart = (req, res, next) => {
  // ::::: MYSQL :::::
  // Pasamos el Cart
  // Cart.getCart((cart) => {
  // Ademas necesitamos info de los Products, de dicho cart:
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     // Filtramos productos dentro del cart:
  //     for (product of products) {
  //       const cartProdData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProdData) {
  //         cartProducts.push({ productData: product, qty: cartProdData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts,
  //     });
  //   });
  // });
  //
  // :::::: SEQUELIZE ::::::
  // Pedimos CART asociado al USER Actual, y asu vez PRODUCTS de dicho cart.
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};
// POST Cart Items --->
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  // ::::: MYSQL :::::
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');
  //
  // :::::: SEQUELIZE ::::::
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart; // Pedimos CART of USER
      return cart
        .getProducts({ where: { id: prodId } }) // Pedimos PRODS del CART, unicamente si Coinciden ID del que queremos agregar
        .then((products) => {
          let product; //Product Found devuelve un ARRAY, nos interesa el item 0
          if (products.length > 0) {
            product = products[0]; // Product = Item devuelto dentro del array
          }
          if (product) {
            // Si ya EXISTE previamente:
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product; // Aumentamos la Quantity y lo devolvemos como nuevo.
          }
          return Product.findByPk(prodId); // si NO EXISTE previamente: lo devolvemos(con la newQty: 1)
        })
        .catch((err) => console.log(err));
    })
    .then((product) => {
      // Dicho PROD (exista o no) lo agregamos al CARRO
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST Remove Item from Cart --->
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  //
  // ::::: MYSQL :::::
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
  //
  // :::::: SEQUELIZE ::::::
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
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
