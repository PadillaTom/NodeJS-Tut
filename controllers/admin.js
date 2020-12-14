const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

// POST PRODUCT to be ADDED  ----->
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //
  // :::::: My SQL ::::::
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: SEQUELIZE ::::::
  // Product.create({});
  // req.user
  //   .createProduct({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description,
  //   })
  //   .then((result) => {
  //     // console.log(result);
  //     console.log('Creation OK');
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGODB ::::::
  // const product = new Product(
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  //   null, // Null for ID.
  //   req.user._id // String of Our User, specifically the _ID
  // );
  // product
  //   .save()
  //   .then((result) => {
  //     // console.log(result);
  //     console.log('Creation OK');
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGOOSE ::::::
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });
  product
    .save()
    .then((result) => {
      console.log('Product Created');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

// GET PRODUCT to be EDITED ----->
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // ::::: MYSQL :::::
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product,
  //   });
  // });
  //
  // :::::: SEQUELIZE ::::::
  // Product.findByPk(prodId)
  // req.user
  //   .getProducts({ where: { id: prodId } })
  //   .then((products) => {
  //     const product = products[0];
  //     if (!product) {
  //       res.redirect('/');
  //     } else {
  //       res.render('admin/edit-product', {
  //         path: '/admin/edit-product',
  //         pageTitle: 'Edit Product',
  //         product: product,
  //         editing: editMode,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGODB ::::::
  // Product.findById(prodId)
  //   .then((product) => {
  //     if (!product) {
  //       res.redirect('/');
  //     } else {
  //       res.render('admin/edit-product', {
  //         path: '/admin/edit-product',
  //         pageTitle: 'Edit Product',
  //         product: product,
  //         editing: editMode,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGOOSE ::::::
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
      } else {
        res.render('admin/edit-product', {
          path: '/admin/edit-product',
          pageTitle: 'Edit Product',
          product: product,
          editing: editMode,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST EDITED PRODUCT ------>
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // ::::: MYSQL :::::
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
  //
  // :::::: SEQUELIZE ::::::
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.imageUrl = updatedImageUrl;
  //     product.description = updatedDesc;
  //     return product.save();
  //   })
  //   .then((result) => {
  //     console.log('Product Updated');
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGODB ::::::
  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId
  // )
  //   .save()
  //   .then((result) => {
  //     console.log('Product Updated');
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => console.log(err));
  //
  // :::::: MONGOOSE ::::::
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save(); //SAVE will update behimd the scenes
    })
    .then((result) => {
      console.log('Product Updated OK');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

// GET PRODUCTS to be displayed in ADMIN PRODUCTS ------->
exports.getProducts = (req, res, next) => {
  // ::::: MYSQL :::::
  // Product.fetchAll((products) => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products',
  //   });
  // });
  //
  // :::::: SEQUELIZE ::::::
  // Product.findAll()
  // req.user
  //   .getProducts()
  //   .then((products) => {
  //     res.render('admin/products', {
  //       path: '/admin/products',
  //       pageTitle: 'Admin Products',
  //       prods: products,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGODB ::::::
  // Product.fetchAll()
  //   .then((products) => {
  //     res.render('admin/products', {
  //       path: '/admin/products',
  //       pageTitle: 'Admin Products',
  //       prods: products,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGOOSE ::::::
  Product.find()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'Admin Products',
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST PRODUCT to be DELETED ------->
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // ::::: MYSQL :::::
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
  //
  // :::::: SEQUELIZE ::::::
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log('Destroyed Done');
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGODB ::::::
  // Product.deleteById(prodId)
  //   .then(() => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: MONGOOSE ::::::
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log('Product Removed OK');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};
